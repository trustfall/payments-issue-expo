import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { DangerZone } from 'expo'
const { Payments } = DangerZone

Payments.initialize({
  publishableKey: 'INSERT YOUR OWN TEST KEY HERE'
})

export default class App extends React.Component {
  const = (applePay = async () => {
    const isValid = await Payments.deviceSupportsApplePayAsync()

    if (!isValid) {
      Alert.alert(
        'Apple pay not supported.',
        'Your device is not compatible with Apple Pay. Please choose another payment option',
        [{ text: 'OK', onPress: () => {} }]
      )
    } else {
      const items = [
        {
          label: 'Fees',
          amount: '50.00'
        },
        {
          label: 'Pretend Services, Inc',
          amount: '50.00'
        }
      ]
      const options = {
        countryCode: 'CA',
        currencyCode: 'USD'
      }

      const payToken = await Payments.paymentRequestWithApplePayAsync(
        items,
        options
      )

      console.log(payToken.tokenId)
      Payments.completeApplePayRequestAsync()
      console.log('updatedCard')
    }
  })

  render () {
    return (
      <View style={styles.container}>
        <Text>Pay now!</Text>
        <Button onPress={applePay} title='Pay now' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
