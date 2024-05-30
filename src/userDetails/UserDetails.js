// src/userDetails/UserDetails.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFetch, deleteUsers, updateUser } from '../actions';
import { Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import '../App.css';
import Navbar from '../navbar/Navbar';



const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'website', headerName: 'Website', width: 200 },
];

const UserDetails = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state?.myFirstReducer?.users);
  const [userDetails, setUserDetails] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  console.log(users,'users');

  useEffect(() => {
    setUserDetails(users);
  }, [users]);

  const handleDelete = () => {
    dispatch(deleteUsers(selectionModel[0]));
  };

  const handleEdit = () => {
    const userToEdit = userDetails.find(user => user.id === selectionModel[0]);
    setEditingUser(userToEdit);
  };

  const handleSave = () => {
    dispatch(updateUser(editingUser));
    setEditingUser(null);
    setSelectionModel([]);
  };

  const handleFieldChange = (field, value) => {
    setEditingUser({
      ...editingUser,
      [field]: value,
    });
  };

  const handleFetchDetails = () => {
    dispatch(getUsersFetch());
  }

  return (
    <>
    <Navbar/>
    <div className="App">
      <Button
        variant='contained'
        onClick={handleFetchDetails}
        sx={{ marginTop: '50px', marginBottom: '50px' }}
      >
        Get users
      </Button>
      {userDetails?.length > 0 &&
        <DataGrid
          rows={userDetails}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
          selectionModel={selectionModel}
          sx={{ marginTop: '50px', width: '70%', margin: "auto" }}
        />
      }

      {selectionModel.length > 0 && (
        <div>
          <Button
            variant='contained'
            sx={{ marginTop: '20px', marginRight: '10px' }}
            onClick={handleEdit}
            disabled={selectionModel.length > 1}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            sx={{
              marginTop: '20px', backgroundColor: 'red', marginRight: '10px',
              ':hover': {
                backgroundColor: "red"
              }
            }}
            onClick={handleDelete}
            disabled={editingUser}
          >
            Delete
          </Button>
        </div>
      )}

      {editingUser && (
        <div>
          <TextField
            label="Name"
            value={editingUser.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            sx={{ marginTop: '20px', marginRight: '10px' }}
          />
          <TextField
            label="Phone"
            value={editingUser.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            sx={{ marginTop: '20px', marginRight: '10px' }}
          />
          <TextField
            label="Email"
            value={editingUser.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            sx={{ marginTop: '20px', marginRight: '10px' }}
          />
          <TextField
            label="Website"
            value={editingUser.website}
            onChange={(e) => handleFieldChange('website', e.target.value)}
            sx={{ marginTop: '20px', marginRight: '10px' }}
          />
          <Button
            variant='contained'
            sx={{ marginTop: '30px', backgroundColor: 'green' }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      )}
    </div>
    </>
  );
}

export default UserDetails;
