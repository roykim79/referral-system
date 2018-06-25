import React, {Component} from 'react';
import ReactTable from 'react-table';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

// const fakeData = [{
//     status: 'pending',
//     _id: "5b311360e4452164a2e5ff73",
//     client_name: "Roy",
//     client_phone: "(919)999-9999",
//     client_email: "random@example.com",
//     description: "Important from organizationa",
//     referring_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a11"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a10",
//         organizationName: "organizationa",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.552Z",
//         __v: 0
//     },
//     receiving_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a13"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a12",
//         organizationName: "organizationb",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.558Z",
//         __v: 0
//     },
//     referring_user: {
//         phone: "(919)123-4567",
//         roles: "user",
//         _id: "5b31133c5360b46492752a11",
//         username: "usera",
//         firstName: "aaron",
//         lastName: "hayslip",
//         email: "aaron@projectshift.io",
//         organization: "5b31133c5360b46492752a10",
//         dateJoin: "2018-06-25T16:07:24.552Z",
//         lastActive: "2018-06-25T16:07:24.552Z",
//         salt: "45e38e39ec12b37d3a00d52ab4b8e986",
//         hash: "36195c268d7a501c28b8d3f10e2a8110a3ff0e4e13a84230855d0bb1081d4e6603415734c5be15f4f0243885f1bc61ac7af3a64efea161c7f0bfa98a9bae3ba7",
//         __v: 0
//     },
//     notes: [
//         {
//             "date": "2018-06-25T16:08:00.157Z",
//             "_id": "5b311360e4452164a2e5ff74",
//             "text": "hi from aaron",
//             "posting_user": "5b31133c5360b46492752a11"
//         }
//     ],
//     created: "2018-06-25T16:08:00.157Z",
//     __v: 0
// },
// {
//     status: 'accepted',
//     _id: "5b311360e4452164a2e5ff73",
//     client_name: "Roy",
//     client_phone: "(919)999-9999",
//     client_email: "random@example.com",
//     description: "Important from organizationa",
//     referring_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a11"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a10",
//         organizationName: "organizationa",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.552Z",
//         __v: 0
//     },
//     receiving_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a13"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a12",
//         organizationName: "organizationb",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.558Z",
//         __v: 0
//     },
//     referring_user: {
//         phone: "(919)123-4567",
//         roles: "user",
//         _id: "5b31133c5360b46492752a11",
//         username: "usera",
//         firstName: "aaron",
//         lastName: "hayslip",
//         email: "aaron@projectshift.io",
//         organization: "5b31133c5360b46492752a10",
//         dateJoin: "2018-06-25T16:07:24.552Z",
//         lastActive: "2018-06-25T16:07:24.552Z",
//         salt: "45e38e39ec12b37d3a00d52ab4b8e986",
//         hash: "36195c268d7a501c28b8d3f10e2a8110a3ff0e4e13a84230855d0bb1081d4e6603415734c5be15f4f0243885f1bc61ac7af3a64efea161c7f0bfa98a9bae3ba7",
//         __v: 0
//     },
//     notes: [
//         {
//             "date": "2018-06-25T16:08:00.157Z",
//             "_id": "5b311360e4452164a2e5ff74",
//             "text": "hi from aaron",
//             "posting_user": "5b31133c5360b46492752a11"
//         }
//     ],
//     created: "2018-06-25T16:08:00.157Z",
//     __v: 0
// },
// {
//     status: 'rejected',
//     _id: "5b311360e4452164a2e5ff73",
//     client_name: "Roy",
//     client_phone: "(919)999-9999",
//     client_email: "random@example.com",
//     description: "Important from organizationa",
//     referring_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a11"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a10",
//         organizationName: "organizationa",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.552Z",
//         __v: 0
//     },
//     receiving_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a13"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a12",
//         organizationName: "organizationb",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.558Z",
//         __v: 0
//     },
//     referring_user: {
//         phone: "(919)123-4567",
//         roles: "user",
//         _id: "5b31133c5360b46492752a11",
//         username: "usera",
//         firstName: "aaron",
//         lastName: "hayslip",
//         email: "aaron@projectshift.io",
//         organization: "5b31133c5360b46492752a10",
//         dateJoin: "2018-06-25T16:07:24.552Z",
//         lastActive: "2018-06-25T16:07:24.552Z",
//         salt: "45e38e39ec12b37d3a00d52ab4b8e986",
//         hash: "36195c268d7a501c28b8d3f10e2a8110a3ff0e4e13a84230855d0bb1081d4e6603415734c5be15f4f0243885f1bc61ac7af3a64efea161c7f0bfa98a9bae3ba7",
//         __v: 0
//     },
//     notes: [
//         {
//             "date": "2018-06-25T16:08:00.157Z",
//             "_id": "5b311360e4452164a2e5ff74",
//             "text": "hi from aaron",
//             "posting_user": "5b31133c5360b46492752a11"
//         }
//     ],
//     created: "2018-06-25T16:08:00.157Z",
//     __v: 0
// },
// {
//     status: 'accepted',
//     _id: "5b311360e4452164a2e5ff73",
//     client_name: "Roy",
//     client_phone: "(919)999-9999",
//     client_email: "random@example.com",
//     description: "Important from organizationa",
//     referring_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a11"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a10",
//         organizationName: "organizationa",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.552Z",
//         __v: 0
//     },
//     receiving_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a13"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a12",
//         organizationName: "organizationb",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.558Z",
//         __v: 0
//     },
//     referring_user: {
//         phone: "(919)123-4567",
//         roles: "user",
//         _id: "5b31133c5360b46492752a11",
//         username: "usera",
//         firstName: "aaron",
//         lastName: "hayslip",
//         email: "aaron@projectshift.io",
//         organization: "5b31133c5360b46492752a10",
//         dateJoin: "2018-06-25T16:07:24.552Z",
//         lastActive: "2018-06-25T16:07:24.552Z",
//         salt: "45e38e39ec12b37d3a00d52ab4b8e986",
//         hash: "36195c268d7a501c28b8d3f10e2a8110a3ff0e4e13a84230855d0bb1081d4e6603415734c5be15f4f0243885f1bc61ac7af3a64efea161c7f0bfa98a9bae3ba7",
//         __v: 0
//     },
//     notes: [
//         {
//             "date": "2018-06-25T16:08:00.157Z",
//             "_id": "5b311360e4452164a2e5ff74",
//             "text": "hi from aaron",
//             "posting_user": "5b31133c5360b46492752a11"
//         }
//     ],
//     created: "2018-06-25T16:08:00.157Z",
//     __v: 0
// },
// {
//     status: 'accepted',
//     _id: "5b311360e4452164a2e5ff73",
//     client_name: "Roy",
//     client_phone: "(919)999-9999",
//     client_email: "random@example.com",
//     description: "Important from organizationa",
//     referring_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a11"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a10",
//         organizationName: "organizationa",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.552Z",
//         __v: 0
//     },
//     receiving_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a13"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a12",
//         organizationName: "organizationb",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.558Z",
//         __v: 0
//     },
//     referring_user: {
//         phone: "(919)123-4567",
//         roles: "user",
//         _id: "5b31133c5360b46492752a11",
//         username: "usera",
//         firstName: "aaron",
//         lastName: "hayslip",
//         email: "aaron@projectshift.io",
//         organization: "5b31133c5360b46492752a10",
//         dateJoin: "2018-06-25T16:07:24.552Z",
//         lastActive: "2018-06-25T16:07:24.552Z",
//         salt: "45e38e39ec12b37d3a00d52ab4b8e986",
//         hash: "36195c268d7a501c28b8d3f10e2a8110a3ff0e4e13a84230855d0bb1081d4e6603415734c5be15f4f0243885f1bc61ac7af3a64efea161c7f0bfa98a9bae3ba7",
//         __v: 0
//     },
//     notes: [
//         {
//             "date": "2018-06-25T16:08:00.157Z",
//             "_id": "5b311360e4452164a2e5ff74",
//             "text": "hi from aaron",
//             "posting_user": "5b31133c5360b46492752a11"
//         }
//     ],
//     created: "2018-06-25T16:08:00.157Z",
//     __v: 0
// },
// {
//     status: 'pending',
//     _id: "5b311360e4452164a2e5ff73",
//     client_name: "Roy",
//     client_phone: "(919)999-9999",
//     client_email: "random@example.com",
//     description: "Important from organizationa",
//     referring_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a11"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a10",
//         organizationName: "organizationa",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.552Z",
//         __v: 0
//     },
//     receiving_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a13"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a12",
//         organizationName: "organizationb",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.558Z",
//         __v: 0
//     },
//     referring_user: {
//         phone: "(919)123-4567",
//         roles: "user",
//         _id: "5b31133c5360b46492752a11",
//         username: "usera",
//         firstName: "aaron",
//         lastName: "hayslip",
//         email: "aaron@projectshift.io",
//         organization: "5b31133c5360b46492752a10",
//         dateJoin: "2018-06-25T16:07:24.552Z",
//         lastActive: "2018-06-25T16:07:24.552Z",
//         salt: "45e38e39ec12b37d3a00d52ab4b8e986",
//         hash: "36195c268d7a501c28b8d3f10e2a8110a3ff0e4e13a84230855d0bb1081d4e6603415734c5be15f4f0243885f1bc61ac7af3a64efea161c7f0bfa98a9bae3ba7",
//         __v: 0
//     },
//     notes: [
//         {
//             "date": "2018-06-25T16:08:00.157Z",
//             "_id": "5b311360e4452164a2e5ff74",
//             "text": "hi from aaron",
//             "posting_user": "5b31133c5360b46492752a11"
//         }
//     ],
//     created: "2018-06-25T16:08:00.157Z",
//     __v: 0
// },
// {
//     status: 'pending',
//     _id: "5b311360e4452164a2e5ff73",
//     client_name: "Roy",
//     client_phone: "(919)999-9999",
//     client_email: "random@example.com",
//     description: "Important from organizationa",
//     referring_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a11"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a10",
//         organizationName: "organizationa",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.552Z",
//         __v: 0
//     },
//     receiving_organization: {
//         website: "projectShift.io",
//         address: "112 broad way st",
//         logo: "https://99designs-start-attachments.imgix.net/alchemy-pictures/2016%2F02%2F22%2F04%2F24%2F31%2Fb7bd820a-ecc0-4170-8f4e-3db2e73b0f4a%2F550250_artsigma.png?auto=format&ch=Width%2CDPR&w=250&h=250",
//         members: [
//             "5b31133c5360b46492752a13"
//         ],
//         tags: [
//             "5b31133c5360b46492752a0d",
//             "5b31133c5360b46492752a0e",
//             "5b31133c5360b46492752a0f"
//         ],
//         _id: "5b31133c5360b46492752a12",
//         organizationName: "organizationb",
//         description: "Cohort 2 Rocks",
//         email: "aaron@projectshift.io",
//         phone: "(919)123-4567",
//         dateCreated: "2018-06-25T16:07:24.558Z",
//         __v: 0
//     },
//     referring_user: {
//         phone: "(919)123-4567",
//         roles: "user",
//         _id: "5b31133c5360b46492752a11",
//         username: "usera",
//         firstName: "aaron",
//         lastName: "hayslip",
//         email: "aaron@projectshift.io",
//         organization: "5b31133c5360b46492752a10",
//         dateJoin: "2018-06-25T16:07:24.552Z",
//         lastActive: "2018-06-25T16:07:24.552Z",
//         salt: "45e38e39ec12b37d3a00d52ab4b8e986",
//         hash: "36195c268d7a501c28b8d3f10e2a8110a3ff0e4e13a84230855d0bb1081d4e6603415734c5be15f4f0243885f1bc61ac7af3a64efea161c7f0bfa98a9bae3ba7",
//         __v: 0
//     },
//     notes: [
//         {
//             "date": "2018-06-25T16:08:00.157Z",
//             "_id": "5b311360e4452164a2e5ff74",
//             "text": "hi from aaron",
//             "posting_user": "5b31133c5360b46492752a11"
//         }
//     ],
//     created: "2018-06-25T16:08:00.157Z",
//     __v: 0
// }]

class ReferralList extends Component {
    constructor(props) {
        super(props)
    }
    renderTable = () => {
        let columns = [{Header: 'Organization', accessor: 'referring_organization.organizationName'},{Header: 'Name', accessor: 'referring_user.firstName'},{Header: 'Client', accessor: 'client_name'}, {Header: 'Date', accessor: 'created'}, {Header: 'Status', accessor: 'status'}]
        let data;
        if(this.props.status !== null){
            data = this.props.referrals.filter((referral) => {
                return referral.status == this.props.status;
            })
        } else {
            data = this.props.referrals;
        }
        return <ReactTable 
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            onClick: (e) => {
                                this.props.history.push(`/referrals/${rowInfo.original.id}`)
                            }
                        }
                    }}
                    data={data}
                    columns={columns}
        />
    }
    
    render() {
        return this.renderTable()
    }
}

const mapStateToProps = ({referrals}) => {
    return {referrals}
}
export default connect(mapStateToProps)(withRouter(ReferralList)); 