import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllBooks, getAllCategory } from "../../services/bookservice";
import { useEffect, useState } from "react";
import { Button } from "../../Components/ui/button";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getAllCategory();
    setProducts(data.result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      {/* <pre>{JSON.stringify(products[0], null, 2)}</pre> */}

      <h1 className="font-bold text-3xl text-center my-10">Books</h1>
      <div className="max-w-4xl mx-auto flex justify-end">
        <Button className="">Add</Button>
      </div>
      <Table className="max-w-4xl overflow-hidden mx-auto  ">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell className="gap-2 flex w-fit text-right">
                <Button
                  variant="outline"
                  className="border-green-600 bg-green-50"
                >
                  Edit
                </Button>
                <Button variant="outline" className="border-red-600 bg-red-50">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Category;
