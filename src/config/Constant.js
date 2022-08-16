const ADMIN=1;
const HR_MANEGER=2;
const SR_DEVELOPER=3;
const JUNIOR_DEVELOPER=4;
const STATUS = [
    { name: 'Active', value: 1 },
    { name: 'Deactive', value: 2 }
]

const ROLE = [
    { name: 'Admin', value: 1 },
    { name: 'Hr', value: 2 },
    { name: 'Developer', value: 3 },
    { name: 'TL', value: 4 },
]

const LEAVETYPE = [
    { name: 'Causual leave', value: 1 },
    { name: 'Sick leave', value: 2 },
    { name: 'Loss of pay', value: 3 },
]

const DESIGNATION = [
    { name: 'SEO', value: ADMIN },
    { name: 'HR Manager', value: HR_MANEGER },
    { name: 'Software Developer', value: SR_DEVELOPER },
    { name: 'Intern Software Developer', value: JUNIOR_DEVELOPER },
]

const Constant = {
    STATUS,
    ROLE,
    DESIGNATION,
    ADMIN,
    HR_MANEGER,
    SR_DEVELOPER,JUNIOR_DEVELOPER,
    LEAVETYPE
}

module.exports= Constant;