import TourDateTableHead from "./TourDateTableHead";
import TourDateTableBody from "./TourDateTableBody";
import CustomButton from "@/components/customButton";
import { Stack } from "@mui/material";
import { IUseForm } from "../../sections/dashboard/tourPack/TourPackFormModal";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { IDate } from "@/interfaces";

export interface TourDateTableFormValues {
    dates: IDate[];
}

interface IProps {
    register: UseFormRegister<IUseForm>;
    errors: any;
    watch: UseFormWatch<IUseForm>;
    setValue: UseFormSetValue<IUseForm>;
    isLoading: boolean;
}

const TourDateTable = ({ register, errors, watch, setValue, isLoading }: IProps) => {
    const watchDates = watch('dates');

    const {
        control,
    } = useForm<TourDateTableFormValues>({
        defaultValues: {
            dates: watchDates,
        },
        mode: "onBlur",
    });

    const {
        fields,
        remove,
        append,
    } = useFieldArray({
        name: "dates",
        control,
    });

    const defaultDate = {
        date: '',
        people_count: 0,
        duration: 0
    }

    const appendDate = () => {
        append(defaultDate);
        setValue('dates', [...(watchDates ?? []), defaultDate])
    }

    const removeDate = (index: number) => {
        remove(index);
        const copyFeilds = watchDates?.filter((_: IDate, dateIndex: number) => dateIndex !== index);
        setValue('dates', copyFeilds)
    }

    return (
        <>
            <Stack
                sx={{
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 1fr 60px",
                    border: "1px solid #CBD5E1",
                    overflow: "hidden",
                }}
            >
                <TourDateTableHead />
                {fields?.map(
                    (
                        allocations: FieldArrayWithId<TourDateTableFormValues, "dates", "id">,
                        index: number
                    ) => {
                        return (
                            <TourDateTableBody
                                key={allocations?.id}
                                register={register}
                                index={index}
                                removeDate={removeDate}
                                errors={errors}
                                isLoading={isLoading}
                            />
                        );
                    }
                )}
            </Stack>
            <CustomButton disabled={isLoading} onClick={appendDate} type="button" variant="outlined">
                Qo'shish
            </CustomButton>
        </>
    );
};

export default TourDateTable;
