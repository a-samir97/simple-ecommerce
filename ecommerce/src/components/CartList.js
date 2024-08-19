import {Button, List} from "antd";
import React from "react";

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
                    />
                    <div>Total Price: ${item.total_price}</div>
                </List.Item>
            )}
        />
    );
}

export default CartList;