import React, {useEffect, useState} from 'react';
import { Avatar, List } from 'antd';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
   // use effect to get the categories already exist in our database
    useEffect(() => {
            async function fetchCategories() {
                try {
                    const response = await fetch("http://localhost:8000/api/categories/");
                    const data = await response.json();
                    setCategories(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }

            // FIXME: get called 2 times
            fetchCategories();
        },
        []);

  return(
        <List
        itemLayout="horizontal"
        dataSource={categories}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.icon} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
  )
};
export default CategoryList;