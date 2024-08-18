import {Button, List} from "antd";
import React, {useState} from "react";

const CartList = ({cart, removeFromCart}) => {
    return (
        <List
            dataSource={cart}
            renderItem={(item, index) => (
                <List.Item
                    actions={[<Button onClick={() => removeFromCart(index)}>Remove</Button>]}
                >
                    <List.Item.Meta
                        title={item.name}
                        // description={`Parts: ${item.items.map(part => part.name).join(', ')}`}
                    />
                    <div>Total Price: ${item.total_price}</div>
                </List.Item>
            )}
        />
    );
}

export default CartList;