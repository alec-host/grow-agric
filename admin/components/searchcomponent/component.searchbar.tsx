import React, {useState} from 'react';

import { Box,Input,Table as AdminBroTable} from '@admin-bro/design-system';

const searchBar = () => {

    const [searchInput,setSearchInput] = useState("");

    const farmers = [{name:"joe peters",_id:1},{name:"mark owino",_id:2},{name:"fin fish",_id:3}];

    const handleChange = (e:any) => {
        setSearchInput(e.target.value);
        console.log(e.target.value);
        e.preventDefault();
    };

    if(searchInput.length > 0){
        farmers.filter((farmer) => {
            console.log(farmer.name.match(searchInput));
            return farmer.name.match(searchInput);
        });
    }

    return(
        <Box flex>
            <AdminBroTable>
                <thead>
                    <tr>
                        <td>
                            <Input
                                width='100%'
                                type="search"
                                placeholder="Search here"
                                onChange={handleChange}
                                value={searchInput} />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {farmers?.map((farmer) => {
                        <tr key={farmer?._id}>
                            <td>{farmer?.name}</td>
                        </tr>
                    })}
                </tbody>
            </AdminBroTable>
        </Box>
    );
};
export default searchBar;