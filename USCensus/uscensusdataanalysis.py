# -*- coding: utf-8 -*-
"""USCensusDataAnalysis.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1j03Pa0iXLiTjFZUh0_dupcSkbRPBGt7C
"""

import pandas as pd
import requests
import matplotlib.pyplot as plt
import numpy as np

def typeCasting(df, data, ofType):
  return df.astype({data: ofType})

url = 'https://api.census.gov/data/2019/acs/acs1?get=NAME,B01003_001E,B01002_001E,B11016_001E,B19301_001E&for=state:*'
response = requests.request("GET", url).json()
df = pd.DataFrame(response[1:], columns=["State", "Population","MedianAge", "TotalHouseholdSize", "PerCapitaIncome", "StateCode"])

df = typeCasting(df, "Population", "int")
df = typeCasting(df, "MedianAge", "float")
df = typeCasting(df, "TotalHouseholdSize", "int")
df = typeCasting(df, "PerCapitaIncome", "int")

df['AverageHouseholdSize'] = df['Population'] / df['TotalHouseholdSize']
print(df.head())

#Csv file
df.to_csv("us_census_data.csv")

#Total Population
population = df['Population'].sum()
print("Total Population of USA:", population)

#Median Age
medianAge = df['MedianAge'].median()
print("Median Age of USA:", medianAge)



#Average House Hold
avgHouseHoldSize = df['AverageHouseholdSize'].sum() / len(df['AverageHouseholdSize'])
print("Average House Hold Size in USA:", avgHouseHoldSize)

#Per capita income
perCapitaIncome = df['PerCapitaIncome'].sum() / len(df['PerCapitaIncome'])
print("Per Capita Income in USA:", perCapitaIncome)

#function to set labels
def setLabels(legend, labelx,labely):
  plt.legend([legend], loc ="upper left")
  plt.ylabel(labely)
  plt.xlabel(labelx)

#function to plot horizontal bar graph
def plotGraph(df,xlab,ylab,xwidth,legend,labelx,labely,yheight=0.8):
  xvar = df[xlab] #PerCapita Income
  yvar = df[ylab]
  plt.rcParams['figure.figsize'] = [15, 18] #graph size
  for i in range(len(df)):
    plt.text(xwidth, i-0.2, df[xlab][i].round(2), ha="center", color="white") #to show the values in graph
  plt.barh(yvar, xvar, height = yheight)
  setLabels(legend, labelx,labely)
  plt.show()

#function to plot scatter graph
def plotScatter(df,xlab,ylab,legend,labelx,labely):
  medianAge = df[xlab]
  perCapita = df[ylab]
  plt.rcParams['figure.figsize'] = [20, 8]
  plt.scatter(medianAge, perCapita)
  setLabels(legend, labelx,labely)
  plt.show()

#Per capita income varies by state
plotGraph(df,'PerCapitaIncome','State',5000,'Per capita income varies by state',"Per Capita Income","States")

# #Average household vs state
plotGraph(df,'AverageHouseholdSize','State',0.1,'Average Household vs State',"State","Average Household",0.9)

#Relationship between median age and per capita income
plotScatter(df,'MedianAge','PerCapitaIncome','Relationship between per capita income and median age','Median Age','Per Capita Income')

corrr = df[["MedianAge", 'PerCapitaIncome']].corr()
print(corrr)
