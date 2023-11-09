import SvgColor from '../../../components/svg-color';

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Shaharlar',
    path: '/dashboard/cities',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Mehmonxonalar',
    path: '/dashboard/hotels',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Tur paketlar',
    path: '/dashboard/tour-packs',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Buyurtmalar',
    path: '/dashboard/orders',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
