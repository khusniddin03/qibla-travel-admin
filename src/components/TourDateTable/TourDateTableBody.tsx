import { Button, Stack } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import DatePickerField from "@/components/fields/DatePickerField";
import CustomTextField from "@/components/fields/CustomTextField";
import { IUseForm } from "../../sections/dashboard/tourPack/TourPackFormModal";

interface IProps {
    removeDate: (index: number) => void;
    index: number;
    register: UseFormRegister<IUseForm>;
    errors: any;
    isLoading: boolean;
}

const TourDateTableBody = ({ removeDate, index, register, errors,isLoading }: IProps) => {
    return (
        <>
            <Stack
                sx={{
                    bgcolor: "#fff",
                    px: "5px",
                    py: "5px",
                    fontSize: "14px",
                    fontWeight: 400,
                    borderRight: "1px solid #CBD5E1",
                    borderTop: "1px solid #CBD5E1",
                }}
            >
                <DatePickerField
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    label=""
                    name={`dates.${index}.date`}
                    min="1900-01-01"
                    max="2500-01-01"
                    labelDisabled
                />
            </Stack>
            <Stack
                sx={{
                    bgcolor: "#fff",
                    px: "5px",
                    py: "5px",
                    fontSize: "14px",
                    fontWeight: 400,
                    borderRight: "1px solid #CBD5E1",
                    borderTop: "1px solid #CBD5E1",
                }}
            >
                <CustomTextField
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    label=""
                    name={`dates.${index}.people_count`}
                    defaultValue="0"
                    labelDisabled
                />
            </Stack >
            <Stack
                sx={{
                    bgcolor: "#fff",
                    px: "5px",
                    py: "5px",
                    fontSize: "14px",
                    fontWeight: 400,
                    borderRight: "1px solid #CBD5E1",
                    borderTop: "1px solid #CBD5E1",
                }}
            >
                <CustomTextField
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    label=""
                    name={`dates.${index}.duration`}
                    defaultValue="0"
                    labelDisabled
                />
            </Stack>
            <Stack
                sx={{
                    bgcolor: "#fff",
                    px: "5px",
                    py: "5px",
                    fontSize: "14px",
                    fontWeight: 400,
                    borderTop: "1px solid #CBD5E1",
                }}
            >
                <Button
                    sx={{
                        p: 0,
                        minWidth: "auto",
                        width: "100%",
                        height: "100%",
                    }}
                    onClick={() => removeDate(index)}
                    disabled={isLoading}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.8032 3.9225C14.5957 3.8025 13.3882 3.7125 12.1732 3.645V3.6375L12.0082 2.6625C11.8957 1.9725 11.7307 0.9375 9.97573 0.9375L8.01073 0.9375C6.26323 0.9375 6.09823 1.9275 5.97823 2.655L5.82073 3.615C5.12323 3.66 4.42573 3.705 3.72823 3.7725L2.19823 3.9225C1.88323 3.9525 1.65823 4.23 1.68823 4.5375C1.71823 4.845 1.98823 5.07 2.30323 5.04L3.83323 4.89C7.76323 4.5 11.7232 4.65 15.6982 5.0475C15.7207 5.0475 15.7357 5.0475 15.7582 5.0475C16.0432 5.0475 16.2907 4.83 16.3207 4.5375C16.3432 4.23 16.1182 3.9525 15.8032 3.9225Z"
                            fill="#E11D48"
                        />
                        <path
                            d="M14.4218 6.105C14.2418 5.9175 13.9943 5.8125 13.7393 5.8125L4.25932 5.8125C4.00432 5.8125 3.74932 5.9175 3.57682 6.105C3.40432 6.2925 3.30682 6.5475 3.32182 6.81L3.78682 14.505C3.86932 15.645 3.97432 17.07 6.59182 17.07H11.4068C14.0243 17.07 14.1293 15.6525 14.2118 14.505L14.6768 6.8175C14.6918 6.5475 14.5943 6.2925 14.4218 6.105ZM10.2443 13.3125H7.74682C7.43932 13.3125 7.18432 13.0575 7.18432 12.75C7.18432 12.4425 7.43932 12.1875 7.74682 12.1875H10.2443C10.5518 12.1875 10.8068 12.4425 10.8068 12.75C10.8068 13.0575 10.5518 13.3125 10.2443 13.3125ZM10.8743 10.3125H7.12432C6.81682 10.3125 6.56182 10.0575 6.56182 9.75C6.56182 9.4425 6.81682 9.1875 7.12432 9.1875H10.8743C11.1818 9.1875 11.4368 9.4425 11.4368 9.75C11.4368 10.0575 11.1818 10.3125 10.8743 10.3125Z"
                            fill="#E11D48"
                        />
                    </svg>
                </Button>
            </Stack>
        </>
    );
};

export default TourDateTableBody;
