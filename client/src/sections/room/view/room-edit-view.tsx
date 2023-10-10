// @mui
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import RoomNewEditForm from '../room-new-edit-form';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetRoom } from 'src/api/product';
// components
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function RoomEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { room: currentRoom } = useGetRoom(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Phòng',
            href: paths.dashboard.room.root,
          },
          { name: currentRoom?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <RoomNewEditForm currentRoom={currentRoom} />
    </Container>
  );
}
