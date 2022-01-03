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

import { CommonActions, useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import CustomScrollView from 'components/CustomScrollView';
import Markdown from 'components/Markdown';
import TouchableItem from 'components/TouchableItem';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'styles/colors';
import containerStyles from 'styles/containerStyles';
import fontStyles from 'styles/fontStyles';
import { saveTaCAndPPConfirmation } from 'utils/db';
import { migrateAccounts } from 'utils/migrationUtils';

import tac from '../../docs/terms-and-conditions.md';
import { useTac } from '../hooks/useTac';

export default function TermsAndConditions(): React.ReactElement {
	const [isTacAgreed, setTacAgreement] = useState(false);
	const { dispatch } = useNavigation();
	const { ppAndTaCAccepted, setPpAndTaCAccepted } = useTac();

	const onConfirm = useCallback(async () => {
		saveTaCAndPPConfirmation()
			.then(() => {
				migrateAccounts()
					.then(() => {
						setPpAndTaCAccepted(true);
						const resetAction = CommonActions.reset({
							index: 0,
							routes: [{ name: 'AccountList' }]
						});

						dispatch(resetAction);
					})
					.catch((e) => {
						console.error('migrateAccounts error', e);
					})
			}).catch((e)=> {
				console.error('saveTaCAndPPConfirmation error', e)
			});
	}, [dispatch, setPpAndTaCAccepted]);

	return (
		<View
			style={containerStyles.background}
		>
			<CustomScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
				<Markdown>{tac}</Markdown>
			</CustomScrollView>

			{!ppAndTaCAccepted && (
				<View>
					<TouchableItem
						onPress={(): void => setTacAgreement(!isTacAgreed)}
						style={{
							alignItems: 'center',
							flexDirection: 'row',
							paddingHorizontal: 16,
							paddingVertical: 10
						}}
					>
						<Icon
							name={isTacAgreed ? 'checkbox-marked' : 'checkbox-blank-outline'}
							style={styles.icon}
						/>

						<Text style={fontStyles.t_big}>
							{'  I agree to the terms and conditions'}
						</Text>
					</TouchableItem>

					<Button
						disabled={!isTacAgreed}
						onPress={onConfirm}
						style={styles.nextButton}
						title="Next"
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		color: colors.text.faded,
		fontSize: 30
	},
	nextButton: {
		marginBottom: 24,
		marginTop: 16
	}
});
