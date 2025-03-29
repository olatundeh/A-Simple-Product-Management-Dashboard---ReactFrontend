import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Toolbar,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import '../App.css';

export default function ProductList({ products, editProduct, deleteProduct, showForm }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [filterProductCode, setFilterProductCode] = useState('');
  const [filterProductName, setFilterProductName] = useState('');

  const handleSort = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.productCode.toLowerCase().includes(filterProductCode.toLowerCase()) &&
      product.productName.toLowerCase().includes(filterProductName.toLowerCase())
  );

  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'price' || orderBy === 'quantity' || orderBy === 'createdAt') {
      if (orderBy === 'createdAt'){
        const dateA = new Date(a[orderBy]);
        const dateB = new Date(b[orderBy]);
        return compare(dateA, dateB, isAsc);
      }
      return compare(a[orderBy], b[orderBy], isAsc);
    } else {
      return compare(a[orderBy].toString().toLowerCase(), b[orderBy].toString().toLowerCase(), isAsc);
    }
  });

  function compare(a, b, isAsc) {
    if (a < b) {
      return isAsc ? -1 : 1;
    }
    if (a > b) {
      return isAsc ? 1 : -1;
    }
    return 0;
  }

  return (
    <div className="container mt-4">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:2}}>
        <IconButton aria-label="add" onClick={showForm}>
          Add Product
          <Add />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Filter Product Code"
            value={filterProductCode}
            onChange={(e) => setFilterProductCode(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Filter Product Name"
            value={filterProductName}
            onChange={(e) => setFilterProductName(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Toolbar>

      <TableContainer component={Paper} className="styled-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="styled-table-head">
            <TableRow>
              <TableCell className="styled-table-cell">S/N</TableCell>
              <TableCell className="styled-table-cell">
                <TableSortLabel
                  active={orderBy === 'category'}
                  direction={orderBy === 'category' ? order : 'asc'}
                  onClick={handleSort('category')}
                >
                  Category
                  {orderBy === 'category' ? (
                    <span style={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell className="styled-table-cell">
                <TableSortLabel
                  active={orderBy === 'productName'}
                  direction={orderBy === 'productName' ? order : 'asc'}
                  onClick={handleSort('productName')}
                >
                  Name
                  {orderBy === 'productName' ? (
                    <span style={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell className="styled-table-cell">
                <TableSortLabel
                  active={orderBy === 'productCode'}
                  direction={orderBy === 'productCode' ? order : 'asc'}
                  onClick={handleSort('productCode')}
                >
                  Product Code
                  {orderBy === 'productCode' ? (
                    <span style={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell className="styled-table-cell">
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={handleSort('price')}
                >
                  Price
                  {orderBy === 'price' ? (
                    <span style={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell className="styled-table-cell">
                <TableSortLabel
                  active={orderBy === 'quantity'}
                  direction={orderBy === 'quantity' ? order : 'asc'}
                  onClick={handleSort('quantity')}
                >
                  Quantity
                  {orderBy === 'quantity' ? (
                    <span style={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell className="styled-table-cell">
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={handleSort('createdAt')}
                >
                  Date Added
                  {orderBy === 'createdAt' ? (
                    <span style={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell className="styled-table-cell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.map((product, index) => (
              <TableRow key={product.id} className="styled-table-row">
                <TableCell className="styled-table-cell">{index + 1}</TableCell>
                <TableCell className="styled-table-cell">{product.category}</TableCell>
                <TableCell className="styled-table-cell">{product.productName}</TableCell>
                <TableCell className="styled-table-cell">{product.productCode}</TableCell>
                <TableCell className="styled-table-cell">£{product.price.toFixed(2)}</TableCell>
                <TableCell className="styled-table-cell">{product.quantity}</TableCell>
                <TableCell className="styled-table-cell">{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="styled-table-cell">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton aria-label="edit" onClick={() => editProduct(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => deleteProduct(product.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}