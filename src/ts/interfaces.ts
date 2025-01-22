//Interfaces are annotated with certain requirements
//  in order to help generate the schema with ts-to-zod.

/**
 * Interface to define general Equipment.
 *
 * things to note for zod validation:
 *  - name REQUIRED (minimum 3 characters).
 *  - location REQUIRED.
 *  - Department -> drop down menu from enum.
 *  - model REQUIRED.
 *  - serialNumber REQUIRED (alpha-numeric)
 *  - installDate REQUIRED (must be a past date) 
 *  - status -> drop down from enum.
 */
interface Equipment{
	id: string;

    /**
     * @minLength 3
     */
	name: string;

	location: string;
	department: 'Machining' | 'Assembly' | 'Packaging' | 'Shipping';
	model: string;
	serialNumber: string; //alphanumeric
	installDate: Date;
	status: 'Operational' | 'Down' | 'Maintenance' | 'Retired';
}

/**
 * Interface to define a Maintence Record.
 *
 * things to note for zod validation:
 *  - Equipment (dropdown selection, required)
 *  - Date (required, not future date)
 *  - Type (dropdown from enum)
 *  - Technician (required, min 2 chars)
 *  - Hours Spent (required, positive number, max 24)
 *  - Description (required, min 10 chars)
 *  - Parts Replaced (optional, dynamic array of strings)
 *  - Priority (dropdown from enum)
 *  - Completion Status (dropdown from enum)
 */
interface MaintenanceRecord{
	id: string;
	equipmentId: string;
	date: Date;
	type: 'Preventive' | 'Repair' | 'Emergency';

    /**
     * @minLength 2
     */
	technician: string;

    /**
     * @minimum 0
     * @maximum 24
     */
	hoursSpent: number;

    /**
     * @minLength 10
     */
	description: string;

	partsReplaced?: string[];

	priority: 'Low' | 'Medium' | 'High';

	completionStatus: 'Complete' | 'Incomplete' | 'Pending Parts';
}
