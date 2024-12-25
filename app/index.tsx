import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import CartItem from './CartItem';
import { theme } from './theme';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgSrc: string;
};

export default function HomeView() {
  const [cartItemList, setCartItemList] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalQuantity();
  }, [cartItemList]);

  async function fetchCartItems() {
    const response = await axios.get('https://fakestoreapi.com/products');
    const data = response.data;
    const cartItems = data.map((item: any) => ({
      id: item.id,
      name: item.title,
      price: item.price,
      quantity: 1,
      imgSrc: item.image,
    }));
    setCartItemList(cartItems);
  }

  function calculateTotalQuantity() {
    const totalQuantity = cartItemList.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(totalQuantity);
  }

  function handleButtonClick(type: string, id: number) {
    const updatedCartItems = cartItemList.map((item) => {
      if (item.id === id) {
        const newQuantity =
          type === 'add' ? item.quantity + 1 : Math.max(item.quantity - 1, 0);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItemList(updatedCartItems);
  }

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Shopping Cart</Text>
        <Text style={styles.totalQuantity}>
          Total Quantity: {totalQuantity}
        </Text>
      </View>
      {cartItemList.map((item) => (
        <View key={item.id}>
          <CartItem
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            imgSrc={item.imgSrc}
            handleButtonClick={handleButtonClick}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    marginBottom: 10,
    borderBottomColor: theme.primaryColor,
    backgroundColor: theme.colorWhite,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  totalQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
