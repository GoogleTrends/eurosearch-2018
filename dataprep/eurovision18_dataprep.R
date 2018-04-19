Sys.setlocale(category = "LC_ALL", locale = "en_US.UTF-8")

library(dplyr)
library(tidyr)
library(googlesheets)
library(countrycode)
library(readxl)

eurovision <- gs_title("Eurovision_TEST_result")
sf1 <- gs_read(eurovision, "SF1 Clean", range = cell_cols(1:25))
sf2 <- gs_read(eurovision, "SF2 Clean", range = cell_cols(1:24))
final <- gs_read(eurovision, "Simulate Final Clean", range = cell_cols(1:46))

##Search votes
votes <- gather(final, key = "from", value = "points", 4:46) %>%
  select(1, 4, 5) %>%
  mutate(Country = countrycode(Country, 'country.name', 'iso3c'), from = countrycode(from, 'country.name', 'iso3c'))
colnames(votes) <- c("to", "from", "points")

write.csv(votes, "../data/votes_2018-04-18.csv", row.names = FALSE)

##Ranking
ranking <- group_by(votes, to) %>%
  summarise(points = sum(points)) %>%
  top_n(26, wt = points) %>%
  arrange(desc(points)) %>%
  select(to)
colnames(ranking) <- c("Country")

write.csv(ranking, "../data/overallranking_2018-04-18.csv", row.names = FALSE)

## Qualification
participants <- read_excel("participants.xlsx")
participants <- mutate(participants, countrycode2 = countrycode(countrycode, 'iso3c', 'iso2c')) %>%
  mutate(name = countrycode(countrycode, 'iso3c', 'country.name'))

##Join the simulated qualifiers
qualified <- ranking
qualified$qualified <- TRUE
participants <- left_join(participants, qualified, by = c("countrycode" = "Country"))
participants[is.na(participants)] <- FALSE
##AFTER QUALIFICATION
##JOIN LIST WITH REAL QUALIFIERS, ADD TO COLUMN qualifiedreaml

write.csv(qualified, "../qualification_2018-04-18.csv", row.names = FALSE)

