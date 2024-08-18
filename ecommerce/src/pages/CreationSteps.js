import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import ProductForm from "../components/ProductForm";
import PartForm from "../components/PartForm";
import PartsOptionsForm from "../components/OptionForm";
import PriceRuleForm from "../components/PriceRuleForm";
import ProhibitedCombinations from "../components/ProhibitedCombinations";
import {useNavigate} from "react-router-dom";

const steps = [
  {
    title: 'Product',
    content: <ProductForm />,
  },
  {
    title: 'Parts',
    content: <PartForm />,
  },
  {
    title: 'Options',
    content: <PartsOptionsForm />,
  },
  {
    title: 'Custom Price',
    content: <PriceRuleForm />,
  },
  {
    title: 'Prohibited Combinations',
    content: <ProhibitedCombinations />,
  },
];

const CreationStepsComponent = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const next = () => {
      setCurrent(current + 1);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    next();
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: '450px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div style={{ marginTop: '60px', marginLeft: '150px', marginRight: '150px' }}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>
        {React.cloneElement(steps[current].content, {
          onSubmit: handleFormSubmit,
          formData: formData
        })}
      </div>
      {current === 3 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => next()}
          >
            Skip
          </Button>
      )
      }
      {current === steps.length - 1 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              navigate("/")
            }}
          >
            Done
          </Button>
      )
      }
    </div>
  );
};

export default CreationStepsComponent;
