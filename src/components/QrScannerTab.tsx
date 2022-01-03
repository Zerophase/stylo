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

import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from 'styles/colors';
import fontStyles from 'styles/fontStyles';

import { useHelperNavigation } from '../hooks/useNavigationHelpers';
import TouchableItem from './TouchableItem';

export default function QrScannerTab(): React.ReactElement {
	const { navigateToQrScanner } = useHelperNavigation()

	return (
		<TouchableItem
			onPress={navigateToQrScanner}
			style={styles.body}
		>
			<Icon
				// accessibilityComponentType={'button'}
				// accessibilityTraits={'button'}
				color={colors.text.main}
				name="qrcode-scan"
				size={fontStyles.i_large.fontSize}
				type="material-community"
			/>
			<Text style={styles.textLabel}>QR Scanner</Text>
		</TouchableItem>
	);
}

const styles = StyleSheet.create({
	body: {
		alignItems: 'center',
		backgroundColor: colors.background.os,
		borderBottomColor: colors.background.app,
		borderBottomWidth: 1,
		height: 72,
		justifyContent: 'center',
		paddingVertical: 9
	},
	textLabel: {
		...fontStyles.a_text,
		color: colors.text.faded,
		marginTop: 4
	}
});
