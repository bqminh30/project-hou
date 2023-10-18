import { IRoom, ITypeRoom } from 'src/types/room';
// types
import { ITourFilterValue, ITourFilters, ITourItem } from 'src/types/tour';
// _mock
import { TOUR_SERVICE_OPTIONS, TOUR_SORT_OPTIONS, _tourGuides } from 'src/_mock';
import { useCallback, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import EmptyContent from 'src/components/empty-content';
// components
import Iconify from 'src/components/iconify';

import { RouterLink } from 'src/routes/components';
// @mui
import Stack from '@mui/material/Stack';
// assets
import { countries } from 'src/assets/data';
// utils
import { fTimestamp } from 'src/utils/format-time';
import orderBy from 'lodash/orderBy';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useGetRooms } from 'src/api/product';
import { useSettingsContext } from 'src/components/settings';

//
import RoomList from '../room-list';
// import TourSort from '../tour-sort';
import RoomSearch from '../room-search';
// import TourFilters from '../tour-filters';
// import TourFiltersResult from '../tour-filters-result';

// ----------------------------------------------------------------------

const defaultFilters: ITourFilters = {
  destination: [],
  tourGuides: [],
  services: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function RoomListView() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');
  const [tableDataRoom, setTableDataRoom] = useState<IRoom[]>([]);

  const [search, setSearch] = useState<{ query: string; results: IRoom[] }>({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const { rooms, roomsLoading, roomsEmpty } = useGetRooms()

  useEffect(() => {
    if (rooms.length) {
      setTableDataRoom(rooms)
    }
  }, [rooms])

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;


  const dataFiltered = applyFilter({
    inputData: rooms,
    filters,
    sortBy,
    dateError,
  });

  const canReset =
    !!filters.destination.length ||
    !!filters.tourGuides.length ||
    !!filters.services.length ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name: string, value: ITourFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = rooms?.filter(
          (room) => room.name.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query, rooms]
  );

  // useEffect(() => {
  //   handleSearch()
  // },[handleSearch])

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <RoomSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.room.details(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        {/* <TourFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          serviceOptions={TOUR_SERVICE_OPTIONS.map((option) => option.label)}
          tourGuideOptions={_tourGuides}
          destinationOptions={countries}
          //
          dateError={dateError}
        />

        <TourSort sort={sortBy} onSort={handleSortBy} sortOptions={TOUR_SORT_OPTIONS} /> */}
      </Stack>
    </Stack>
  );

  // const renderResults = (
  //   <TourFiltersResult
  //     filters={filters}
  //     onResetFilters={handleResetFilters}
  //     //
  //     canReset={canReset}
  //     onFilters={handleFilters}
  //     //
  //     results={dataFiltered.length}
  //   />
  // );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Phòng',
            href: paths.dashboard.room.root,
          },
          { name: 'Danh sách' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.room.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Tạo phòng
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {/* {canReset && renderResults} */}
      </Stack>

      {notFound && <EmptyContent title="No Data" filled sx={{ py: 10 }} />}

      <RoomList rooms={dataFiltered} roomsLoading={roomsLoading} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
  dateError,
}: {
  inputData: IRoom[];
  filters: ITourFilters;
  sortBy: string;
  dateError: boolean;
}) => {
  const { services, destination, startDate, endDate, tourGuides } = filters;

  const tourGuideIds = tourGuides.map((tourGuide) => tourGuide.id);

  // SORT BY
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // FILTERS
  // if (!dateError) {
  //   if (startDate && endDate) {
  //     inputData = inputData.filter(
  //       (tour) =>
  //         fTimestamp(tour.available.startDate) >= fTimestamp(startDate) &&
  //         fTimestamp(tour.available.endDate) <= fTimestamp(endDate)
  //     );
  //   }
  // }

  // if (destination.length) {
  //   inputData = inputData.filter((tour) => destination.includes(tour.destination));
  // }

  // if (tourGuideIds.length) {
  //   inputData = inputData.filter((tour) =>
  //     tour.tourGuides.some((filterItem) => tourGuideIds.includes(filterItem.id))
  //   );
  // }

  // if (services.length) {
  //   inputData = inputData.filter((tour) => tour.services.some((item) => services.includes(item)));
  // }

  return inputData;
};
