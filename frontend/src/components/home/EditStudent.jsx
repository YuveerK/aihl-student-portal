import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditStudent = ({
  handleCloseEditStudentModal,
  student,
  handleUpdatedStudent,
}) => {
  const [firstName, setFirstName] = useState(student.firstName);
  const [middleName, setMiddleName] = useState(student.middleName);
  const [surname, setSurname] = useState(student.surname);
  const [dob, setDob] = useState(() => {
    if (student.dob) {
      const dateObj = new Date(student.dob);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return "";
  });

  const [idNumber, setIdNumber] = useState(student.idNumber);
  const [passportNumber, setPassportNumber] = useState(student.passportNumber);
  const [email, setEmail] = useState(student.email);
  const [primaryContactDetails, setPrimaryContactDetails] = useState(
    student.primaryContactDetails
  );
  const [secondaryContactDetails, setSecondaryContactDetails] = useState(
    student.secondaryContactDetails
  );
  const [learnerProvince, setLearnerProvince] = useState(
    student.learnerProvince
  );
  const [learnerDistrictMunicipality, setLearnerDistrictMunicipality] =
    useState(student.learnerDistrictMunicipality);
  const [learnerResidentialArea, setLearnerResidentialArea] = useState(
    student.learnerResidentialArea
  );
  const [ruralUrban, setRuralUrban] = useState(student.ruralUrban);
  const [race, setRace] = useState(student.race);
  const [gender, setGender] = useState(student.gender);
  const [age, setAge] = useState(student.age);
  const [youthYesNo, setYouthYesNo] = useState(student.youthYesNo);
  const [disability, setDisability] = useState(student.disability);
  const [citizenship, setCitizenship] = useState(student.citizenship);

  const [formError, setFormError] = useState("");

  const handleEditStudent = async (e) => {
    // Add student logic
    let data = {
      firstName: firstName,
      middleName: middleName,
      surname: surname,
      idNumber: idNumber,
      passportNumber: passportNumber,
      dob: dob,
      primaryContactDetails: primaryContactDetails,
      secondaryContactDetails: secondaryContactDetails,
      email: email,
      race: race,
      gender: gender,
      age: age,
      youthYesNo: youthYesNo,
      disability: disability,
      citizenship: citizenship,
      learnerProvince: learnerProvince,
      learnerDistrictMunicipality: learnerDistrictMunicipality,
      learnerResidentialArea: learnerResidentialArea,
      ruralUrban: ruralUrban,
    };

    await axios
      .put(`http://localhost:2000/update-student/${student.learnerId}`, data)
      .then((res) => {
        console.log(res);
      });
    handleUpdatedStudent(data);
    // handleCloseEditStudentModal(false);
  };

  const handleLearnerProvinceChange = (e) => {
    setLearnerProvince(e.target.value);
    setLearnerDistrictMunicipality(""); // Reset selected municipality when province changes
  };

  const municipalitiesByProvince = {
    "Eastern Cape": [
      "Buffalo City Metropolitan",
      "Nelson Mandela Bay Metropolitan",
      "Matatiele",
      "Ntabankulu",
      "Umzimvubu",
      "Winnie Madikizela-Mandela",
      "Amahlathi",
      "Great Kei",
      "Mbhashe",
      "Mnquma",
      "Ngqushwa",
      "Raymond Mhlaba",
      "Dr AB Xuma",
      "Emalahleni",
      "Enoch Mgijima",
      "Intsika Yethu",
      "Inxuba Yethemba",
      "Sakhisizwe",
      "Elundini",
      "Senqu",
      "Walter Sisulu",
      "Ingquza Hill",
      "King Sabata Dalindyebo",
      "Mhlontlo",
      "Nyandeni",
      "Port St Johns",
      "Blue Crane Route",
      "Dr Beyers Naudé",
      "Kouga",
      "Koukamma",
      "Makana",
      "Ndlambe",
      "Sundays River Valley",
    ],
    "Free State": [
      "Mangaung Metropolitan",
      "Mafube",
      "Metsimaholo",
      "Moqhaka",
      "Ngwathe",
      "Masilonyana",
      "Matjhabeng",
      "Nala",
      "Tokologo",
      "Tswelopele",
      "Dihlabeng",
      "Maluti-A-Phofung",
      "Mantsopa",
      "Nketoana",
      "Phumelela",
      "Setsoto",
      "Kopanong",
      "Letsemeng",
      "Mohokare",
    ],
    Gauteng: [
      "City of Ekurhuleni Metropolitan",
      "City of Johannesburg Metropolitan",
      "City of Tshwane Metropolitan",
      "Emfuleni",
      "Lesedi",
      "Midvaal",
      "Merafong City",
      "Mogale City",
      "Rand West City",
    ],
    "KwaZulu-Natal": [
      "eThekwini Metropolitan",
      "Dannhauser",
      "eMadlangeni",
      "Newcastle",
      "Dr Nkosazana Dlamini Zuma",
      "Greater Kokstad",
      "Ubuhlebezwe",
      "Umzimkhulu",
      "KwaDukuza",
      "Mandeni",
      "Maphumulo",
      "Ndwedwe",
      "City of uMhlathuze",
      "Mthonjaneni",
      "Nkandla",
      "uMfolozi",
      "uMlalazi",
      "Ray Nkonyeni",
      "Umdoni",
      "Umuziwabantu",
      "Umzumbe",
      "Impendle",
      "Mkhambathini",
      "Mpofana",
      "Msunduzi",
      "Richmond",
      "uMngeni",
      "uMshwathi",
      "Big 5 Hlabisa",
      "Jozini",
      "Mtubatuba",
      "uMhlabuyalingana",
      "Endumeni",
      "Nquthu",
      "uMsinga",
      "Umvoti",
      "Alfred Duma",
      "Inkosi Langalibalele",
      "Okhahlamba",
      "AbaQulusi",
      "eDumbe",
      "Nongoma",
      "Ulundi",
      "uPhongolo",
    ],
    Limpopo: [
      "Blouberg",
      "Lepelle-Nkumpi",
      "Molemole",
      "Polokwane",
      "Ba-Phalaborwa",
      "Greater Giyani",
      "Greater Letaba",
      "Greater Tzaneen",
      "Maruleng",
      "Elias Motsoaledi",
      "Ephraim Mogale",
      "Fetakgomo Tubatse",
      "Makhuduthamaga",
      "Collins Chabane",
      "Makhado",
      "Musina",
      "Thulamela",
      "Bela-Bela",
      "Lephalale",
      "Modimolle-Mookgophong",
      "Mogalakwena",
      "Thabazimbi",
    ],
    Mpumalanga: [
      "Bushbuckridge",
      "City of Mbombela",
      "Nkomazi",
      "Thaba Chweu",
      "Chief Albert Luthuli",
      "Dipaleseng",
      "Dr Pixley Ka Isaka Seme",
      "Govan Mbeki",
      "Lekwa",
      "Mkhondo",
      "Msukaligwa",
      "Dr JS Moroka",
      "Emakhazeni",
      "Emalahleni",
      "Steve Tshwete",
      "Thembisile Hani",
      "Victor Khanye",
    ],
    "Northern Cape": [
      "Dikgatlong",
      "Magareng",
      "Phokwane",
      "Sol Plaatje",
      "Ga-Segonyana",
      "Gamagara",
      "Joe Morolong",
      "Hantam",
      "Kamiesberg",
      "Karoo Hoogland",
      "Khai-Ma",
      "Nama Khoi",
      "Richtersveld",
      "Emthanjeni",
      "Kareeberg",
      "Renosterberg",
      "Siyancuma",
      "Siyathemba",
      "Thembelihle",
      "Ubuntu",
      "Umsobomvu",
      "!Kheis",
      "Dawid Kruiper",
      "Kai !Garib",
      "Kgatelopele",
      "Tsantsabane",
    ],
    "North West": [
      "Kgetlengrivier",
      "Madibeng",
      "Moretele",
      "Moses Kotane",
      "Rustenburg",
      "City of Matlosana",
      "JB Marks",
      "Maquassi Hills",
      "Greater Taung",
      "Kagisano-Molopo",
      "Lekwa-Teemane",
      "Mamusa",
      "Naledi",
      "Ditsobotla",
      "Mahikeng",
      "Ramotshere Moiloa",
      "Ratlou",
      "Tswaing",
    ],
    "Western Cape": [
      "City of Cape Town Metropolitan",
      "Breede Valley",
      "Drakenstein",
      "Langeberg",
      "Stellenbosch",
      "Witzenberg",
      "Beaufort West",
      "Laingsburg",
      "Prince Albert",
      "Bitou",
      "George",
      "Hessequa",
      "Kannaland",
      "Knysna",
      "Mossel Bay",
      "Oudtshoorn",
      "Cape Agulhas",
      "Overstrand",
      "Swellendam",
      "Theewaterskloof",
      "Bergrivier",
      "Cederberg",
      "Matzikama",
      "Saldanha Bay",
      "Swartland",
    ],
  };

  const municipalities = municipalitiesByProvince[learnerProvince] || [];

  console.log(dob);
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-center">
      <div className="w-[800px] h-[80%] overflow-auto bg-blue-950 p-8 rounded-md">
        <div className="w-full flex items-center justify-end">
          <div onClick={() => handleCloseEditStudentModal(false)}>
            <AiOutlineClose
              size={25}
              color="white"
              className="cursor-pointer"
            />
          </div>
        </div>
        <h1 className="text-2xl text-white mb-8 text-center">
          Add New Student
        </h1>

        {formError && (
          <div className="w-full flex items-center justify-center text-red-500 mb-4">
            {formError}
          </div>
        )}

        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input_styles"
            />
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Middle Name</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="input_styles"
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Surname</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="input_styles"
            />
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="input_styles"
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Citizenship</label>
            <select
              value={citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
              className="input_styles"
              required
            >
              <option value="">Select Citizenship</option>
              <option value="South African Citizen">
                South African Citizen
              </option>
              <option value="Non South African Citizen">
                Non South African Citizen
              </option>
            </select>
          </div>
          {citizenship === "South African Citizen" && (
            <div className="w-full flex flex-col m-2">
              <label className="text-white">ID Number</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="input_styles"
                required={citizenship === "South African Citizen"}
              />
            </div>
          )}
          {citizenship === "Non South African Citizen" && (
            <div className="w-full flex flex-col m-2">
              <label className="text-white">Passport Number</label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="input_styles"
                required={citizenship === "Non South African Citizen"}
              />
            </div>
          )}
        </div>

        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input_styles"
            />
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Primary Contact Details</label>
            <input
              type="text"
              value={primaryContactDetails}
              onChange={(e) => setPrimaryContactDetails(e.target.value)}
              className="input_styles"
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Secondary Contact Details</label>
            <input
              type="text"
              value={secondaryContactDetails}
              onChange={(e) => setSecondaryContactDetails(e.target.value)}
              className="input_styles"
            />
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Learner Province</label>
            <select
              value={learnerProvince}
              onChange={handleLearnerProvinceChange}
              className="input_styles"
              required
            >
              <option value="">Select Province</option>
              <option value="Eastern Cape">Eastern Cape</option>
              <option value="Free State">Free State</option>
              <option value="Gauteng">Gauteng</option>
              <option value="KwaZulu-Natal">KwaZulu-Natal</option>
              <option value="Limpopo">Limpopo</option>
              <option value="Mpumalanga">Mpumalanga</option>
              <option value="Northern Cape">Northern Cape</option>
              <option value="North West">North West</option>
              <option value="Western Cape">Western Cape</option>
            </select>
          </div>
        </div>
        {municipalities.length !== 0 && (
          <div className="w-full flex items-center">
            <div className="w-full flex flex-col m-2">
              <label className="text-white">
                Learner District Municipality
              </label>
              <select
                value={learnerDistrictMunicipality}
                onChange={(e) => setLearnerDistrictMunicipality(e.target.value)}
                className="input_styles"
                required
              >
                <option value="">Select Municipality</option>
                {municipalities.map((municipality) => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Learner Residential Area</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={learnerResidentialArea}
              onChange={(e) => setLearnerResidentialArea(e.target.value)}
              style={{ resize: "none" }}
              className="input_styles"
              required
            ></textarea>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Rural/Urban</label>
            <input
              type="text"
              value={ruralUrban}
              onChange={(e) => setRuralUrban(e.target.value)}
              className="input_styles"
            />
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Race</label>
            <input
              type="text"
              value={race}
              onChange={(e) => setRace(e.target.value)}
              className="input_styles"
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Gender</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input_styles"
            />
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input_styles"
            />
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Youth (Yes/No)</label>
            <select
              value={youthYesNo}
              onChange={(e) => setYouthYesNo(e.target.value)}
              className="input_styles"
              required
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="w-full flex flex-col m-2">
            <label className="text-white">Disability</label>
            <input
              type="text"
              value={disability}
              onChange={(e) => setDisability(e.target.value)}
              className="input_styles"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-white rounded-md px-6 py-2 mt-4 text-blue-950 font-semibold hover:bg-gray-200 transition-colors"
            onClick={(e) => handleEditStudent()}
          >
            Update Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
