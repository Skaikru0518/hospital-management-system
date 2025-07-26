users:
Field	Type	Description
id	INT, PK, AI	Primary key
name	VARCHAR(100)	Full name
email	VARCHAR(100)	Unique, login
password	VARCHAR(255)	Hashed password
role	ENUM	'admin', 'doctor', 'patient', 'receptionist'
created_at	DATETIME	
updated_at	DATETIME

patients:
Field	Type	Description
id	INT, PK, AI	Primary key
user_id	INT, FK	References users(id)
insurance_no	VARCHAR(50)	Insurance number
address	VARCHAR(255)	
date_of_birth	DATE	
phone	VARCHAR(30)

doctors:
Field	Type	Description
id	INT, PK, AI	Primary key
user_id	INT, FK	References users(id)
specialty	VARCHAR(100)	
room	VARCHAR(20)	Office/room number
phone	VARCHAR(30)

appointments:
Field	Type	Description
id	INT, PK, AI	Primary key
patient_id	INT, FK	References patients(id)
doctor_id	INT, FK	References doctors(id)
appointment_time	DATETIME	
status	ENUM	'scheduled', 'completed', 'cancelled'
notes	TEXT	Optional notes
created_at	DATETIME

medical_records:
Field	Type	Description
id	INT, PK, AI	Primary key
patient_id	INT, FK	References patients(id)
doctor_id	INT, FK	References doctors(id)
description	TEXT	Medical notes, diagnosis
record_date	DATETIME	
attachment	VARCHAR(255)	File path, optional