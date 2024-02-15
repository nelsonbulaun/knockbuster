import React, { useState } from 'react';

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div>
    <div className="flex justify-between font-semibold pt-4" onClick={onClick} style={{ cursor: 'pointer', marginBottom: '5px', borderBottom: '1px solid #ccc' }}>
      <h1>{title}</h1> 
      {isOpen ? <h1 className="font-bold px-2" >V</h1> : <h1 className="font-bold px-2 rotate-90">V</h1>}
    </div>
    {isOpen && <div>{content}</div>}
  </div>
);

export const Accordion = ({ items }) => {
  const [accordionItems, setAccordionItems] = useState(items.map(item => ({ ...item, isOpen: false })));

  const toggleAccordionItem = (index) => {
    setAccordionItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen,
      }))
    );
  };

  return (
    <div className="p-4 ">
      {accordionItems.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={item.isOpen}
          onClick={() => toggleAccordionItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
