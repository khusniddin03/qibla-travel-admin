import SvgColor from "../svg-color";

interface TypeProps {
  icon: string;
  path?: string;
  width?: string;
  height?: string;
  color?: string;
}

const Icon = ({ icon, path = '/assets/icons/', width = '24px', height = '24px', color = 'rgb(33, 43, 54)' }: TypeProps) => {
  return (
    <SvgColor src={`${path}${icon}.svg`} sx={{ width, height, color }} />
  );
};

export default Icon;
