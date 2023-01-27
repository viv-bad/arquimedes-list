import React from "react";
import ItemShow from "./ItemShow";
const ItemList = ({
  items,
  onDelete,
  onEdit,
  onComplete,
  onToggleVivek,
  onToggleKhadija,
}) => {
  // variable to return the individual item in the object in a jsx list element
  const listItems = items.map((item) => {
    // guard clause to prevent empty strings from being added
    if (item.item !== "") {
      return (
        <ItemShow
          item={item}
          key={item._id}
          onDelete={onDelete}
          onEdit={onEdit}
          onComplete={onComplete}
          onToggleVivek={onToggleVivek}
          onToggleKhadija={onToggleKhadija}
        />
      );
    } else {
      return null;
    }
  });

  return (
    <div>
      <ul className="grid grid-cols-2 max-sm:gap-y-8">{listItems}</ul>
    </div>
  );
};

export default ItemList;
