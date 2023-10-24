import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, deleteItem, getQuantitybyId } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const isCartOpenforProduct = useSelector(getQuantitybyId(id));

  function handleAddItems() {
    console.log(id, 'clickid');

    const addedItem = {
      pizzaId: id,
      quantity: 1,
      name,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(addedItem));
  }

  const handleDelete = () => {
    dispatch(deleteItem(id));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isCartOpenforProduct > 0 && (
            <div className="flex items-center gap-2">
              <UpdateItemQuantity
                currentQuantity={isCartOpenforProduct}
                pizzaId={id}
              />
              <Button type="small" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}

          {!soldOut && isCartOpenforProduct <= 0 && (
            <Button type="small" onClick={handleAddItems}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
