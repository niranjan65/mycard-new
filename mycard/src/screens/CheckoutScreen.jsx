import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { erpnextApi } from '../api/erpnextApi';
import { clearCart } from '../store/slices/cartSlice';
import { COLORS } from '../constants/colors';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector(state => state.cart);
  
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      const orderData = {
        customer: 'Guest Customer',
        delivery_date: new Date().toISOString().split('T')[0],
        items: items.map(item => ({
          item_code: item.name,
          qty: item.quantity,
          rate: item.standard_rate,
        })),
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        total_amount: totalAmount,
      };

      const response = await erpnextApi.createSalesOrder(orderData);
      
      if (response) {
        dispatch(clearCart());
        
        Alert.alert(
          'Order Placed Successfully!',
          `Thank you for shopping with Trade Blo Me! Your order ID is ${response.name}`,
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Shipping Address */}
        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
          padding: 16
        }}>
          <Text style={{
            color: COLORS.textPrimary,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16
          }}>Shipping Address</Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              color: COLORS.textPrimary
            }}
            placeholder="Full Name"
            value={shippingAddress.name}
            onChangeText={(text) => setShippingAddress({...shippingAddress, name: text})}
          />
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              color: COLORS.textPrimary,
              height: 80,
              textAlignVertical: 'top'
            }}
            placeholder="Address"
            value={shippingAddress.address}
            onChangeText={(text) => setShippingAddress({...shippingAddress, address: text})}
            multiline
          />
          
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                color: COLORS.textPrimary
              }}
              placeholder="City"
              value={shippingAddress.city}
              onChangeText={(text) => setShippingAddress({...shippingAddress, city: text})}
            />
            
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
                color: COLORS.textPrimary
              }}
              placeholder="Pincode"
              value={shippingAddress.pincode}
              onChangeText={(text) => setShippingAddress({...shippingAddress, pincode: text})}
              keyboardType="numeric"
            />
          </View>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightGray,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              color: COLORS.textPrimary
            }}
            placeholder="Phone Number"
            value={shippingAddress.phone}
            onChangeText={(text) => setShippingAddress({...shippingAddress, phone: text})}
            keyboardType="phone-pad"
          />
        </View>

        {/* Payment Method */}
        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
          padding: 16
        }}>
          <Text style={{
            color: COLORS.textPrimary,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16
          }}>Payment Method</Text>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: paymentMethod === 'cod' ? COLORS.primary : COLORS.lightGray,
              backgroundColor: paymentMethod === 'cod' ? COLORS.primaryLight + '20' : COLORS.white,
              marginBottom: 12
            }}
            onPress={() => setPaymentMethod('cod')}
          >
            <Ionicons name="cash" size={24} color={COLORS.primary} />
            <Text style={{
              color: COLORS.textPrimary,
              marginLeft: 12,
              flex: 1
            }}>Cash on Delivery</Text>
            {paymentMethod === 'cod' && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: paymentMethod === 'online' ? COLORS.primary : COLORS.lightGray,
              backgroundColor: paymentMethod === 'online' ? COLORS.primaryLight + '20' : COLORS.white
            }}
            onPress={() => setPaymentMethod('online')}
          >
            <Ionicons name="card" size={24} color={COLORS.primary} />
            <Text style={{
              color: COLORS.textPrimary,
              marginLeft: 12,
              flex: 1
            }}>Online Payment</Text>
            {paymentMethod === 'online' && (
              <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={{
          backgroundColor: COLORS.white,
          marginHorizontal: 16,
          marginVertical: 8,
          borderRadius: 8,
          padding: 16
        }}>
          <Text style={{
            color: COLORS.textPrimary,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16
          }}>Order Summary</Text>
          
          {items.map((item, index) => (
            <View key={index} style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.lightGray
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  color: COLORS.textPrimary,
                  fontWeight: '500'
                }}>{item.item_name}</Text>
                <Text style={{
                  color: COLORS.textSecondary,
                  fontSize: 14
                }}>Qty: {item.quantity}</Text>
              </View>
              <Text style={{
                color: COLORS.textPrimary,
                fontWeight: '600'
              }}>
                ₹{(item.quantity * item.standard_rate).toFixed(2)}
              </Text>
            </View>
          ))}
          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 16,
            marginTop: 10,
            borderTopWidth: 2,
            borderTopColor: COLORS.primary
          }}>
            <Text style={{
              color: COLORS.textPrimary,
              fontSize: 18,
              fontWeight: 'bold'
            }}>Total Amount</Text>
            <Text style={{
              color: COLORS.primary,
              fontSize: 20,
              fontWeight: 'bold'
            }}>₹{totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        padding: 16
      }}>
        <TouchableOpacity
          style={{
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
            backgroundColor: loading ? COLORS.gray : COLORS.primary
          }}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          <Text style={{
            color: COLORS.white,
            fontSize: 18,
            fontWeight: '600'
          }}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;
