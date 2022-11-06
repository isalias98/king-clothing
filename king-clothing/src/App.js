import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

import Navigation from './routes/navigation/navigation.component';

import Home from './routes/home/home.component';
import Authentcation from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import CheckOut from './routes/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';
const App = () => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			const unsubcribe = onAuthStateChangedListener((user) => {
				if (user) {
					createUserDocumentFromAuth(user);
				}
				dispatch(setCurrentUser(user));
			});
			return unsubcribe;
		},
		[ dispatch ]
	);

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentcation />} />
				<Route path="checkout" element={<CheckOut />} />
			</Route>
		</Routes>
	);
};

export default App;
