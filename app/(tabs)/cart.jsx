import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Tomato', image: 'https://via.placeholder.com/100', market1Price: 20, market2Price: 18 },
    { id: 2, name: 'Apple', image: 'https://via.placeholder.com/100', market1Price: 15, market2Price: 16 },
  ]);

  const calculateTotal = (market) => {
    return cartItems.reduce((total, item) => total + (market === 1 ? item.market1Price : item.market2Price), 0);
  };

  const [animatedValue] = useState(new Animated.Value(1));

  const handleItemPress = () => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleDeleteItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handleItemPress}>
        <Animated.View style={[styles.itemDetails, { transform: [{ scale: animatedValue }] }]}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <Text style={styles.itemName}>{item.name}</Text>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
      >
        <Icon name="close" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>UrCart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          <Text style={styles.emptyCartText}>Let's go shopping!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.itemList}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
          </View>

          <View style={styles.marketComparison}>
            <View style={styles.marketContainer}>
              <Text style={styles.marketPrice}>{calculateTotal(1)} SR</Text>
              <Image
                source={{ uri: 'https://cdn.wowdeals.me/uploads/images/companies/85/logo/330x150/1552857294.png' }}
                style={styles.marketLogo}
              />
            </View>
            <View style={styles.marketContainer}>
              <Text style={styles.marketPrice}>{calculateTotal(2)} SR</Text>
              <Image
                source={{ uri: 'https://streetkitchen.co/wp-content/uploads/2020/06/carrefour-logo-1-1.png' }}
                style={styles.marketLogo}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    marginBottom: 8,
  },
  itemList: {
    paddingBottom: 100
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  itemName: {
    fontSize: 16,
    marginLeft: 12,
  },
  deleteButton: {
  },
  totalContainer: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  totalText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  marketComparison: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  marketContainer: {
    alignItems: 'center',
  },
  marketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8, // Add some space between the price and the logo
  },
  marketLogo: {
    width: 80, // Adjust width for both logos
    height: 50, // Adjust height for both logos
    resizeMode: 'contain', // Ensure logos retain their aspect ratio
  },
});

export default Cart;
