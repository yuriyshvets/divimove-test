import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Chip from '@material-ui/core/Chip';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteUserAsync, updateUserAsync } from '../store/actions';
import FormDialog from './FormDialog';
import ConfirmDialog from './ConfirmDialog';

const columns = ['Name', 'E-mail', 'Peers', ''];

const UsersTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((store: RootState) => store.users);
  const dispatch = useDispatch();

  const handleEditUser = (newUser) => {
    dispatch(updateUserAsync(newUser));
  };

  const handleClickEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    dispatch(deleteUserAsync(selectedUser.id));
    setShowConfirmModal(false);
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                {user.peers.map((peer) => (
                  <Chip label={`${peer.first_name} ${peer.last_name}`} key={peer.email} />
                ))}
              </TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(user)}
                >
                  Delete
                </Button>

                <Button
                  onClick={() => handleClickEditUser(user)}
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FormDialog
        show={showModal}
        mode="edit"
        onSubmit={handleEditUser}
        onClose={() => setShowModal(false)}
        user={selectedUser}
      />
      {selectedUser && (
        <ConfirmDialog
          title="Delete user"
          content={
            <>
              Are you sure that you want to delete{' '}
              <b>{`${selectedUser.first_name} ${selectedUser.last_name}`}</b>
            </>
          }
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </Paper>
  );
};

export default UsersTable;
