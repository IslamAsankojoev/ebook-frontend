import { api } from '@/api';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import useRole from '@/hooks/useRole';

const CelebritiesItem: FC<{
  celebrity: ICelebrity;
  refetchList: () => void;
}> = ({ celebrity, refetchList }) => {
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { isAuth, isAuthor, isNotAuth } = useRole();

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpenEditDialog(false);
  };
  const handleClickEditOpen = () => {
    handleClose();
    setOpenEditDialog(true);
  };

  const scroll = 'paper';

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation(
    'delete celebrity',
    () => api.CelebrityService.delete(celebrity.id as number),
    {
      onSettled: () => {
        handleClose();
        refetchList();
      },
    },
  );

  const { mutate, isLoading } = useMutation(
    'update celebrity',
    (data: ICelebrity) => api.CelebrityService.update(celebrity.id as number, data),
    {
      onSettled: () => {
        handleEditClose();
        refetchList();
      },
    },
  );

  const { control, handleSubmit } = useForm({
    defaultValues: celebrity,
  });

  const onSubmit = async (data: ICelebrity) => {
    mutate(data);
  };

  return (
    <>
      <Link
        onClick={handleClickOpen}
        sx={{
          cursor: 'pointer',
          display: 'inline-block',
          width: '49%',
          '@media (max-width: 600px)': {
            width: '100%',
          },
          textDecoration: 'none',
          color: 'white',
        }}
      >
        <Card
          key={celebrity.id}
          sx={{
            padding: '20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '190px',
            backgroundColor: 'grey.400',
            backgroundSize: 'cover',
            position: 'relative',
          }}
        >
          {isAuthor && (
            <IconButton
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: 'error.main',
              }}
              onClick={() => {
                deleteMutate();
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Typography color="secondary.main" variant="h5">
            {celebrity.name}
          </Typography>
          <Typography color="secondary.main">{celebrity.text.slice(0, 200) + '...'}</Typography>
        </Card>
      </Link>

      <Dialog
        sx={{
          // backgroundImage: `url(/bg.jpg)!important`,
          backgroundSize: 'cover',
        }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">{celebrity.name}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {celebrity.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isAuth && isAuthor && <Button onClick={handleClickEditOpen}>Изменить</Button>}
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        sx={{
          // backgroundImage: `url(/bg.jpg)!important`,
          backgroundSize: 'cover',
        }}
        open={openEditDialog}
        onClose={handleEditClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title">Изменить личность</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="name" variant="filled" fullWidth />
              )}
            />
            <Controller
              name="text"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="text" multiline rows={6} variant="filled" fullWidth />
              )}
            />

            <LoadingButton variant="contained" type="submit" fullWidth loading={isLoading}>
              Изменить
            </LoadingButton>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CelebritiesItem;
