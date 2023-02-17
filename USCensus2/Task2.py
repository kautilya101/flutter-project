# -*- coding: utf-8 -*-
"""kautilyaT2.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1pu71d14eJyAUasydNPB7iVByGRnwMzjm
"""

import pandas as pd
import requests
import matplotlib.pyplot as plt
import numpy as np

def typeCasting(df, data, ofType):
  return df.astype({data: ofType})


def dropRow(df,data):
  for i in df[data]:
    if i == 0:
        df.drop(index = df.index[df[data] == 0], inplace = True)
  return df

def plotGraph(df1,plots,sortby,p1,p2,p3,title,plotby='County'):
  df = df1.sort_values(by= sortby,ascending=False)
  df = df.iloc[:plots]
  r = np.arange(len(df))
  Width = 0.2
  plt.bar(r, df[p1], width = Width, label='2017') 
  plt.bar(r + 0.2, df[p2], width = Width, label='2018') 
  plt.bar(r + 0.4, df[p3], width = Width, label='2019') 
  plt.title(title)
  plt.rcParams['figure.figsize'] = [20, 10] #graph size
  plt.xticks(r+ Width/2 ,df[plotby],rotation='vertical')
  plt.legend()

def dFrame(year):
  url = 'https://api.census.gov/data/' + year + '/acs/acs1?get=NAME,B01003_001E,B25068_023E,B25068_024E,B25068_025E,B19301_001E&for=county:*'
  response = requests.request('GET',url).json()
  df1 = pd.DataFrame(response[1:], columns=["County",'Population','slab1','slab2','slab3','perCapitaIncome','State','CountyCode' ])
  df1 = df1.dropna()
  df1 = typeCasting(df1,'Population',int)
  df1 = typeCasting(df1,'perCapitaIncome',int)
  df1.sort_values(by='County',inplace=True,ascending=True)
  return df1


####################################################################
df1 = pd.DataFrame()
df1 = dFrame('2017')
df2 = dFrame('2018')
df3 = dFrame('2019')

df4 = pd.merge(df1,df2,on='County')
df5 = pd.merge(df3,df4)
df5 = typeCasting(df5,'slab1',int)
df5 = typeCasting(df5,'slab1_x',int)
df5 = typeCasting(df5,'slab1_y',int)
df5 = typeCasting(df5,'slab2',int)
df5 = typeCasting(df5,'slab2_x',int)
df5 = typeCasting(df5,'slab2_y',int)
df5 = typeCasting(df5,'slab3',int)
df5 = typeCasting(df5,'slab3_x',int)
df5 = typeCasting(df5,'slab3_y',int)


plotGraph(df5,20,'slab1_x','slab1','slab1_x','slab1_y','2 bedroom (Price: $300 - $499) over years')
plt.show()


plotGraph(df5,20,'slab2_x','slab2','slab2_x','slab2_y','2 bedroom (Price: 500 - 749) over years')
plt.show()

plotGraph(df5,20,'slab3_x','slab3','slab3_x','slab3_y','2 bedroom (Price: 750 - 999) over years')
plt.show()

plotGraph(df5,50,'perCapitaIncome','perCapitaIncome','perCapitaIncome_x','perCapitaIncome_y','Per Capita Income over all years')
plt.show()

"""2017 slab3 is highest because per capita income is higher"""