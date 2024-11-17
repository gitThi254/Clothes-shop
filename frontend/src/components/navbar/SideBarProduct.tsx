import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
import { PresentationChartBarIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { SelectReq } from "../../api/category";
import { Link } from "@tanstack/react-router";
const priceList = [
  {
    _id: 950,
    priceOne: 0.0,
    priceTwo: 49.99,
  },
  {
    _id: 951,
    priceOne: 50.0,
    priceTwo: 99.99,
  },
  {
    _id: 952,
    priceOne: 100.0,
    priceTwo: 199.99,
  },
  {
    _id: 953,
    priceOne: 200.0,
    priceTwo: 399.99,
  },
  {
    _id: 954,
    priceOne: 400.0,
    priceTwo: 599.99,
  },
  {
    _id: 955,
    priceOne: 600.0,
    priceTwo: 1000.0,
  },
];

export function ProductSide({ select }: { select: SelectReq[] }) {
  const [open, setOpen] = React.useState(1);
  return (
    <Card className="h-[calc(100vh-10rem)] sticky top-30 left-0 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Category
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {select.map((item) => (
                <Link to="/products" search={{ categoryId: item.id }}>
                  <ListItem key={item.id}>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    {item.name}
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Price
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {priceList.map((item) => (
                <Link
                  key={item._id}
                  to="/products"
                  search={{ min: item.priceOne, max: item.priceTwo }}
                >
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    $ {item.priceOne} {" - "} {item.priceTwo}
                  </ListItem>
                </Link>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
