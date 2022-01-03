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

import React, { ReactElement, useContext } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import colors from 'styles/colors';
import fontStyles from 'styles/fontStyles';
import { ButtonListener } from 'types/props';

import { AccountsContext, NetworksContext } from '../context';
import AccountIcon from './AccountIcon';
import AccountPrefixedTitle from './AccountPrefixedTitle';
import Address from './Address';
import { NetworkFooter } from './NetworkFooter';
import TouchableItem from './TouchableItem';

interface AccountCardProps{
	address: string;
	derivationPath?: string;
	networkKey?: string;
	isChild?: boolean;
	isLastChild?: boolean;
	onPress?: ButtonListener;
	style?: ViewStyle;
	title?: string;
	titlePrefix?: string;
};

export default function AccountCard({ address, derivationPath, isChild, isLastChild = false, networkKey, onPress, style, title, titlePrefix }: AccountCardProps): ReactElement {
	const { getNetwork } = useContext(NetworksContext);
	const { getAccountByAddress } = useContext(AccountsContext);

	const account = getAccountByAddress(address)
	const derivation = derivationPath || account?.derivationPath
	const displayTitle = title ||account?.name || 'Unknown';
	const network = getNetwork(networkKey) || getNetwork(account?.networkKey);

	return (
		<TouchableItem
			disabled={false}
			onPress={onPress}
		>
			<View style={[styles.content, style]}>
				{isChild && (
					<View style={styles.wrapperChildArrow}>
						<View style={styles.childArrowTop}/>
						<View style={[styles.childArrowBottom, isLastChild ? styles.lastChild : undefined]}/>
					</View>
				)}

				<AccountIcon
					address={account?.address || address}
					network={network}
					style={styles.icon} />
				<View style={styles.desc}>
					{!!derivation && (
						<View>
							<Text style={[fontStyles.t_regular, styles.derivationPath]}>
								{derivation}
							</Text>
						</View>
					)}
					<AccountPrefixedTitle
						title={displayTitle}
						titlePrefix={titlePrefix}
					/>
					{address !== '' && (
						<Address
							address={address}
							protocol={network?.protocol}
						/>
					)}
				</View>
				<NetworkFooter
					color={network?.color}
					text={network?.title}
				/>
			</View>
		</TouchableItem>
	);
}

const styles = StyleSheet.create({
	childArrowBottom: {
		borderColor: colors.text.faded,
		borderLeftWidth: 1,
		flex: 1,
		width: 20
	},
	childArrowTop: {
		borderBottomWidth: 1,
		borderColor: colors.text.faded,
		borderLeftWidth: 1,
		flex: 1,
		width: 20
	},
	content: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 16
	},
	derivationPath: {
		color: colors.text.faded
	},
	desc: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		paddingLeft: 16
	},
	icon: {
		height: 50,
		width: 50
	},
	iconChildren: {
		marginRight: 8
	},
	lastChild : {
		borderLeftWidth: 0
	},
	wrapperChildArrow: {
		alignItems: 'flex-end',
		display: 'flex',
		height: '100%',
		marginRight: 16,
		width: 45
	}
});
