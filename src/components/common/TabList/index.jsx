import React, { useState, Children, cloneElement } from "react";
import { Wrapper, ListContainer, List, Line, ListItem } from "./TabList.styles";

const TabList = ({ tabs, handleClick }) => {
    const [activeTab, setActiveTab] = useState(0);
    const handleSetActiveOnClick = (activeTab, handleOnClick) => {
        setActiveTab(activeTab);
        handleOnClick();
    };
    return (
        <Wrapper>
            <ListContainer>
                {tabs.map((tab, idx) => (
                    <TabItem
                        isActive={activeTab === idx}
                        key={idx}
                        handleClick={() => handleSetActiveOnClick(idx, () => handleClick(tab))}
                    >
                        {tab.name}
                    </TabItem>
                ))}
            </ListContainer>
        </Wrapper>
    );
};

export const TabItem = ({ handleClick, isActive, children }) => {
    return (
        <>
            <ListItem isActive={isActive} color={"#000"} onClick={handleClick}>
                <p>{children}</p>
                {isActive && <Line></Line>}
            </ListItem>{" "}
        </>
    );
};

export default TabList;

// <List color={"#000"}>
//                     <p>Tweets</p>
//                     <Line></Line>
//                 </List>
//                 <List>
//                     <p>Tweets y replies</p>
//                 </List>
//                 <List>
//                     <p>Media</p>
//                 </List>
//                 <List>
//                     <p>Likes</p>
//                 </List>
