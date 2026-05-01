#!/usr/bin/python3

volumeConversion = 3.785

usPrice = 0
cdnPrice = 0
exchangeRate = 0

print('Enter the price per gallon for US gasoline: ')
usPrice = float(input())

if usPrice == 0:
    print('Enter the price per litre for Canadian gasoline: ')
    cdnPrice = float(input())

if usPrice == 0 and cdnPrice == 0:
    print('You must enter either a US or Canadian price.')
    exit()

print('Enter the exchange rate of Canadian dollars to purchase one US dollar: ')
exchangeRate = float(input())

if usPrice == 0:
    usPrice = round(cdnPrice * volumeConversion / exchangeRate, 2)
    print('Your Canadian gasoline at ', cdnPrice, ' per litre would be equivalent to a US price of ', usPrice, ' per gallon.')
else:
    cdnPrice = round(usPrice / volumeConversion * exchangeRate, 2)
    print('Your US gasoline at ', usPrice, ' per gallon would be equivalent to a Canadian price of ', cdnPrice, ' per litre.')



