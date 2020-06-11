import React, {useState} from 'react';
import FileUpload from "../../utils/FileUpload";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Asia" },
  { key: 3, value: "America" },
  { key: 4, value: 'Antatica'},
  { key: 5, value: "south America" },
  { key: 6, value: "Europe" },
  { key: 7, value: "North Ameria" },
  { key: 8, value: "Australia" },
];

const Uploadproduct = ()=> {

   const [TitleValue, setTitleValue] = useState("")
   const [DValue, setDValue] = useState("");
   const [PriceValue, setPriceValue] = useState(0);
   const [ContinentValue, setContinentValue] = useState('1');

   const onTitleChange = (e) => {
        setTitleValue(e.currentTarget.value)
   }

   const onPriceChange = (e) => {
      setPriceValue(e.currentTarget.value);
    };

  const onDChange = (e) => {
      setDValue(e.currentTarget.value);
    };

  const onContinentChange = (e) => {
     setContinentValue(e.currentTarget.value);
   };
    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlig: "center", marginBottom: "2rem" }}>
          <h2> Uploadproduct Page </h2>
        </div>

        <Form onSubmit>
          {/* Drop-Zone */}

          <FileUpload />


          <Form.Group id="">
            <Form.Label> Title</Form.Label>
            <Form.Control onChange={onTitleChange} value={TitleValue} />
          </Form.Group>

          
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={onDChange}
              value={DValue}
            />
          </Form.Group>

         
          <Form.Group>
            <Form.Label>Price($)</Form.Label>
            <Form.Control
              onChange={onPriceChange}
              value={PriceValue}
              type="number"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control as='select' onChange={onContinentChange}>
              {Continents.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button variant='primary' onClick>Submit</Button>
        </Form>
      </div>
    );
}

export default Uploadproduct
