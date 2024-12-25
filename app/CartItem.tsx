import { Image, StyleSheet, Text, View } from 'react-native';
import { theme } from './theme';
import Button from './Button';

type CartItemProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imgSrc: string;
  handleButtonClick: (type: string, id: number) => void;
};

export default function CartItem({
  id,
  name,
  price,
  quantity,
  imgSrc,
  handleButtonClick,
}: CartItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imgSrc }} style={styles.imageStyle} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
      </View>
      <View style={styles.actionContainer}>
        <Button
          buttonText='Add'
          buttonType='add'
          id={id}
          handleButtonClick={handleButtonClick}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <Button
          buttonText='Remove'
          buttonType='remove'
          id={id}
          handleButtonClick={handleButtonClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
    backgroundColor: theme.lightgray,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    flexShrink: 1,
  },
  price: {
    color: theme.primaryColor,
    fontSize: 14,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
