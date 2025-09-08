import { useSelector, useDispatch } from 'react-redux';
import { 
  addToWishlist, 
  removeFromWishlist, 
  toggleWishlist,
  clearWishlist,
  moveToCart,
  selectWishlistItems,
  selectWishlistTotalItems,
  selectIsInWishlist
} from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const totalItems = useSelector(selectWishlistTotalItems);

  const addItemToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const removeItemFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const toggleItemInWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  const clearAllWishlist = () => {
    dispatch(clearWishlist());
  };

  const moveItemToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return {
    wishlistItems,
    totalItems,
    addItemToWishlist,
    removeItemFromWishlist,
    toggleItemInWishlist,
    clearAllWishlist,
    moveItemToCart,
    isInWishlist,
  };
};
