import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fDate } from 'src/utils/format-time';
// _mock
import { TOUR_SERVICE_OPTIONS } from 'src/_mock';
//
import { fCurrency } from 'src/utils/format-number';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import { varTranHover } from 'src/components/animate';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import { IRoom, IRoomImage } from 'src/types/room';

// ----------------------------------------------------------------------

type Props = {
  room: IRoom;
};

export default function RoomDetailsContent({ room }: Props) {
  const {
    id,
    name,
    price,
    description,
    isLiked,
    label,
    numberBed,
    numberPeople,
    rating,
    image,
    roomImages,
    service,
    status,
    title,
    totalRating,
    totalReview, type_room_id,
    updatedAt,
    voucher_id,
    createdAt,
    priceSale,
  } = room;

  const slides = JSON.parse(roomImages);


  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(slides);

  const renderGallery = (
    <>
      <Box
        gap={1}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <m.div
          key={`http://localhost:6969/upload/${image}`}
          whileHover="hover"
          variants={{
            hover: { opacity: 0.8 },
          }}
          transition={varTranHover()}
        >
          <Image
            alt={`http://localhost:6969/upload/${image}`}
            src={`http://localhost:6969/upload/${image}`}
            ratio="1/1"
            onClick={() => handleOpenLightbox(`http://localhost:6969/upload/${image}`)}
            sx={{ borderRadius: 2, cursor: 'pointer' }}
          />
        </m.div>

        <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
          {slides.slice(0, 4).map((item: IRoomImage) => (
            <m.div
              key={`http://localhost:6969/upload/${item.name}`}
              whileHover="hover"
              variants={{
                hover: { opacity: 0.8 },
              }}
              transition={varTranHover()}
            >
              <Image
                src={`http://localhost:6969/upload/${item.name}`}
                ratio="1/1"
                onClick={() => handleOpenLightbox(`http://localhost:6969/upload/${item.name}`)}
                sx={{ borderRadius: 2, cursor: 'pointer' }}
              />
            </m.div>
          ))}
        </Box>
      </Box>

      <Lightbox
        index={selectedImage}
        slides={slides}
        open={openLightbox}
        close={handleCloseLightbox}
      />
    </>
  );

  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 1 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {name}
        </Typography>


        <IconButton>
          <Iconify icon="solar:share-bold" />
        </IconButton>

        <Checkbox
          defaultChecked
          color="error"
          icon={<Iconify icon="solar:heart-outline" />}
          checkedIcon={<Iconify icon="solar:heart-bold" />}
        />
      </Stack>
      <Typography variant="body1" sx={{ flexGrow: 1, mb: 2 }}>
        {title}
      </Typography>

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'subtitle2' }}>
          <Iconify icon="ic:baseline-price-change" color="red" />
          <Box component="span" sx={{ typography: 'body2', color: 'text.secondary' }}>
            Giá tiền
          </Box>
          {!!price && (
            <Box component="span" sx={{ color: 'grey.500', mr: 0.25, textDecoration: 'line-through' }}>
              {fCurrency(price)}
            </Box>
          )}
          {fCurrency(priceSale)}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="eva:star-fill" sx={{ color: 'warning.main' }} />
          <Box component="span" sx={{ typography: 'subtitle2' }}>
            {rating}
          </Box>
          <Link sx={{ color: 'text.secondary' }}>({totalRating} reviews)</Link>
        </Stack>


        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />
          {title}
        </Stack>


      </Stack>
    </>
  );

  const renderOverview = (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
    >
      {[
        {
          label: 'Tổng lượt đánh giá',
          value: `${totalRating}`,
          icon: <Iconify icon="ic:round-star-rate" />,
        },
        {
          label: 'Số điện thoại liên hệ',
          value: '365-374-4961',
          icon: <Iconify icon="solar:phone-bold" />,
        },
        {
          label: 'Tổng lượt nhận xét',
          value: `${totalReview}`,
          icon: <Iconify icon="ic:baseline-rate-review" />,
        },
        {
          label: 'Thông tin liên hệ',
          value: 'Nhân viên tư vấn',
          icon: <Iconify icon="solar:user-rounded-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Box>
  );

  const renderContent = (
    <>
      <Markdown children={description} />

      <Stack spacing={2}>
        <Typography variant="h6"> Services</Typography>

        <Box
          rowGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          {TOUR_SERVICE_OPTIONS.map((ser) => (
            <Stack
              key={ser.label}
              spacing={1}
              direction="row"
              alignItems="center"
            // sx={{
            //   ...(services.includes(service.label) && {
            //     color: 'text.disabled',
            //   }),
            // }}
            >
              <Iconify
                icon="eva:checkmark-circle-2-outline"
                sx={{
                  color: 'primary.main',
                  // ...(services.includes(service.label) && {
                  //   color: 'text.disabled',
                  // }),
                }}
              />
              {ser.label}
            </Stack>
          ))}
        </Box>
      </Stack>
    </>
  );

  return (
    <>
      {renderGallery}

      <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
        {renderHead}

        <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

        {renderOverview}

        <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

        {renderContent}
      </Stack>
    </>
  );
}
