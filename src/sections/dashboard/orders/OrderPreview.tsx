import CustomButton from "@/components/customButton";
import CustomTable from "@/components/customTable/customTable";
import { IOrder, IPerson } from "@/interfaces";
import { Stack, Typography } from "@mui/material";

interface IProps {
    setOrder: React.Dispatch<React.SetStateAction<IOrder | null>>;
    order: IOrder;
}

const OrderPreview = ({ order, setOrder }: IProps) => {
    const {
        status,
        people_count,
        data: { name, email, phone_number, description, people, childs },
    } = order;

    const columns = {
        fname: {
            path: "fname",
            name: "Familya",
        },
        lname: {
            path: "lname",
            name: "Ism",
        },
        citizenship: {
            path: "citizenship",
            name: "Fuqarolik",
        },
        sex: {
            path: "sex",
            name: "Jinsi",
            component: (rowData: IPerson) =>
                rowData?.sex === "male" ? "Erkak" : "Ayol",
        },
        date_of_birth: {
            path: "date_of_birth",
            name: "Tug'ilgan sana",
        },
        validity_period: {
            path: "validity_period",
            name: " Amal qilish muddati",
        },
        passport: {
            path: "passport",
            name: "Passport seria va raqam",
            component: (rowData: IPerson) =>
                `${rowData?.seria} ${rowData?.seria_number}`,
        },
    };

    const { passport, validity_period, ...copyColumns } = columns;
    passport && validity_period;
    const childsColumns = {
        ...copyColumns,
        birth_certificate: {
            path: "birth_certificate",
            name: "Tug'ilganlik haqida guvohnoma",
        },
    };

    return (
        <Stack>
            <Stack direction="row">
                <Stack flexBasis="90%">
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25 }}
                    >
                        Ismi: {name}
                    </Typography>
                    {email && (
                        <Typography
                            variant="body2"
                            sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25 }}
                        >
                            Email: {email}
                        </Typography>
                    )}
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25 }}
                    >
                        Telefon: {phone_number}
                    </Typography>
                    {description && (
                        <Typography
                            variant="body2"
                            sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25 }}
                        >
                            Izox: {description}
                        </Typography>
                    )}
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25 }}
                    >
                        Yo'lovchilar soni: {people_count}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25 }}
                    >
                        Status: {status === "1" ? "Tasdiqlangan" : "Tasdiqlanmagan"}
                    </Typography>
                </Stack>
                <Stack>
                    <CustomButton variant="outlined" onClick={() => setOrder(null)}>
                        Ortga qaytish
                    </CustomButton>
                </Stack>
            </Stack>
            {!!people?.length && (
                <Stack my={1}>
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25, mb: 1 }}
                    >
                        Kattalar
                    </Typography>
                    <CustomTable
                        count={people?.length}
                        columns={columns}
                        data={people || []}
                        hideCheckbox={true}
                    />
                </Stack>
            )}
            {!!childs?.length && (
                <Stack my={1}>
                    <Typography
                        variant="body2"
                        sx={{ color: "#1E293B", fontWeight: "500", fontSize: 25, mb: 1 }}
                    >
                        17 yoshdan kichiklar
                    </Typography>
                    <CustomTable
                        count={childs?.length}
                        columns={childsColumns}
                        data={childs || []}
                        hideCheckbox={true}
                    />
                </Stack>
            )}
        </Stack>
    );
};

export default OrderPreview;
