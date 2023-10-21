import { useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// types
import { IRoom } from 'src/types/room';
// components
import { useRouter } from 'src/routes/hooks';
//
import RoomItem from './room-item';


// ----------------------------------------------------------------------

type Props = {
  rooms: IRoom[];
  roomsLoading: boolean
};

export default function TourList({ rooms, roomsLoading }: Props) {
  const router = useRouter();

  const handleView = useCallback(
    (id: string) => {
      router.push(paths.dashboard.room.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.room.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            onView={() => handleView(room.id)}
            onEdit={() => handleEdit(room.id)}
            onDelete={() => handleDelete(room.id)}
          />
        ))}
      </Box>

      {rooms.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
