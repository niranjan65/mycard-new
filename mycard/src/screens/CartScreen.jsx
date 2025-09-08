import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { COLORS } from '../constants/colors';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View style={{
      backgroundColor: COLORS.white,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
      padding: 16
    }}>
      <View style={{ flexDirection: 'row' }}>
        <Image 
          source={{ uri: item.image || 'https://via.placeholder.com/80' }} 
          style={{
            width: 80,
            height: 80,
            borderRadius: 8
          }}
          resizeMode="cover"
        />
        
        <View style={{
          flex: 1,
          marginLeft: 16
        }}>
          <Text style={{
            color: COLORS.textPrimary,
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4
          }} numberOfLines={2}>
            {item.item_name}
          </Text>
          
          <Text style={{
            color: COLORS.textPrimary,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8
          }}>
            ₹{item.standard_rate}
          </Text>
          
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.lightGray,
              borderRadius: 6
            }}>
              <TouchableOpacity 
                style={{ padding: 8 }}
                onPress={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}
              >
                <Ionicons name="remove" size={16} color={COLORS.textSecondary} />
              </TouchableOpacity>
              
              <Text style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                fontWeight: '600'
              }}>{item.quantity}</Text>
              
              <TouchableOpacity 
                style={{ padding: 8 }}
                onPress={() => onUpdateQuantity(item.quantity + 1)}
              >
                <Ionicons name="add" size={16} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={onRemove}>
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalItems } = useSelector(state => state.cart);

  const handleRemoveItem = (itemName) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => dispatch(removeFromCart(itemName))
        },
      ]
    );
  };

  const handleUpdateQuantity = (itemName, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemName);
    } else {
      dispatch(updateQuantity({ itemName, quantity }));
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to cart before checkout.');
      return;
    }
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onRemove={() => handleRemoveItem(item.name)}
      onUpdateQuantity={(quantity) => handleUpdateQuantity(item.name, quantity)}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {items.length === 0 ? (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 32
        }}>
          <Ionicons name="basket-outline" size={80} color={COLORS.gray} />
          <Text style={{
            color: COLORS.textSecondary,
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 16,
            textAlign: 'center'
          }}>
            Your cart is empty
          </Text>
          <Text style={{
            color: COLORS.textLight,
            textAlign: 'center',
            marginBottom: 32
          }}>
            Looks like you haven't added anything to your cart yet
          </Text>
          <TouchableOpacity 
            style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8
            }}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{
              color: COLORS.white,
              fontWeight: '600',
              fontSize: 16
            }}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={items}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
          
          <View style={{
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderTopColor: COLORS.lightGray,
            padding: 16
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Text style={{
                color: COLORS.textPrimary,
                fontSize: 18,
                fontWeight: '600'
              }}>
                Total ({totalItems} items)
              </Text>
              <Text style={{
                color: COLORS.textPrimary,
                fontSize: 20,
                fontWeight: 'bold'
              }}>
                ₹{totalAmount.toFixed(2)}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                paddingVertical: 16,
                alignItems: 'center'
              }}
              onPress={handleCheckout}
            >
              <Text style={{
                color: COLORS.white,
                fontSize: 18,
                fontWeight: '600'
              }}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
