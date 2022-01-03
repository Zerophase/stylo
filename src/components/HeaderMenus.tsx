// Copyright 2015-2020 Parity Technologies (UK) Ltd.
// Modifications Copyright (c) 2021-2022 Thibaut Sardan

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from 'types/routes';

import { useTac } from '../hooks/useTac';
import PopupMenu from './PopupMenu';

const MAIN_MENUS = ['Main','AccountList'];

function HeaderMenus(): React.ReactElement {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
	const { name } = useRoute();
	const { ppAndTaCAccepted } = useTac()

	const showMainMenu = MAIN_MENUS.includes(name) && ppAndTaCAccepted;

	const onAccountCreate = useCallback((to: keyof RootStackParamList) => {
		navigate(to);
	}, [navigate])

	return (
		<View style={styles.body}>
			{showMainMenu && (
				<PopupMenu
					menuItems={[
						{ text: 'Create account', value: 'AccountNew' },
						{ text: 'Recover account', value: 'RecoverAccount' },
						{ text: 'About', value: 'About' }
					]}
					menuTriggerIconName={'plus-circle'}
					onSelect={onAccountCreate}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		display: 'flex'
	}
});

export default HeaderMenus;
