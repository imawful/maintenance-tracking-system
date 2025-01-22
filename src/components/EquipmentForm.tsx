import { zodResolver } from '@hookform/resolvers/zod';
import { Equipment } from '../ts/types';
import { equipmentSchema } from '../ts/schemas';
import { useForm } from 'react-hook-form';

const EquipmentForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Equipment>({
        resolver: zodResolver(equipmentSchema),
        defaultValues: { id: "" },
    });

    const myOnSubmit = (data: Equipment) => {
        //TODO update the data's id accordingly.
        console.log("submitted an equiment", data);
    };

    return(
        <form onSubmit={handleSubmit(myOnSubmit)}>
            <input type="text" {...register('name')} />
            {typeof errors.name?.message === 'string' && <p>{errors.name?.message}</p>}
            <input type="text" {...register('location')} />
            {typeof errors.location?.message === 'string' && <p>{errors.location?.message}</p>}
            <select {...register('department')}>
                <option value="">Select a department</option>
                <option value="Machining">Machining</option>
                <option value="Assembly">Assembly</option>
                <option value="Packaging">Packaging</option>
                <option value="Shipping">Shipping</option>
            </select>
            {typeof errors.department?.message === 'string' && <p>{errors.department?.message}</p>}
            <input type="text" {...register('model')} />
            {typeof errors.model?.message === 'string' && <p>{errors.model?.message}</p>}
            <input type="text" {...register('serialNumber')} />
            {typeof errors.serialNumber?.message === 'string' && <p>{errors.serialNumber?.message}</p>}
            <input type="date" {...register('installDate')} />
            {typeof errors.installDate?.message === 'string' && <p>{errors.installDate?.message}</p>}
            <select {...register('status')}>
                <option value="">Select a status</option>
                <option value="Operational">Operational</option>
                <option value="Down">Down</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Retired">Retired</option>
            </select>
            {typeof errors.status?.message === 'string' && <p>{errors.status?.message}</p>}
            <input type="submit" />
        </form>
    );
};

export { EquipmentForm };
