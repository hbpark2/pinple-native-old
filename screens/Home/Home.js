import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

const Home = () => {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	const getLoaction = async () => {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
	};

	useEffect(() => {
		getLoaction();
	}, []);

	return (
		<View style={styles.container}>
			{location?.coords?.latitude && (
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: location?.coords?.latitude,
						longitude: location?.coords?.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
					showsUserLocation={true}
					showsMyLocationButton={true}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});

export default Home;
