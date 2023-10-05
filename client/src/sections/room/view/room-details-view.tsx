import { useState, useCallback, useEffect } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
// import { _tours, TOUR_PUBLISH_OPTIONS, TOUR_DETAILS_TABS } from 'src/_mock';
// import { ROOM_DETAILS_TABS } from 'src/_mock';
import { ROOM_DETAILS_TABS } from 'src/_mock';
// components
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
//
import { IRoom } from 'src/types/room';
import { useGetRoom } from 'src/api/product';

import { RoomDetailsSkeleton } from '../room-skeleton';
import RoomDetailsToolbar from '../room-details-toolbar';
import RoomDetailsContent from '../room-details-content';
// import TourDetailsBookers from '../tour-details-bookers';



// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function TourDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  // const currentTour = _tours.filter((tour) => tour.id === id)[0];
  const [tableDataRoom, setTableDataRoom] = useState<IRoom | any>();

  const { room, roomLoading, roomEmpty } = useGetRoom(id)

  useEffect(() => {
    setTableDataRoom(room)
  }, [room])

  const [currentTab, setCurrentTab] = useState('content');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);


  const renderSkeleton = <RoomDetailsSkeleton />;

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {ROOM_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'bookers' ? (
              <Label variant="filled">{ }</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RoomDetailsToolbar
        backLink={paths.dashboard.room.root}
        editLink={paths.dashboard.room.edit(`${room?.id}`)}
        liveLink="#"
      // publish={publish || ''}
      // onChangePublish={handleChangePublish}
      // publishOptions={TOUR_PUBLISH_OPTIONS}
      />
      {renderTabs}
      {roomLoading && renderSkeleton}

      {currentTab === 'content' && room && <RoomDetailsContent room={room} />}

      {/* {currentTab === 'bookers' && <TourDetailsBookers bookers={currentTour?.bookers} />} */}
    </Container>
  );
}
