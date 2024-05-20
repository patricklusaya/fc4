//TODO: GENERAL IMPORTS
import React, { useEffect, useRef, useState } from "react";
import { Image, View, ActivityIndicator, Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";

//TODO: ACTION IMPORTS
//action imports


//TODO: COMMON IMPORTS
//common imports


//TODO: COMPONENTS IMPORTS
//component imports

//TODO: PROPERTY IMPORTS
//property declarations
const { height } = Dimensions.get("window");

function getImgXtension() {
    //const basename = uri.split(/[\\/]/).pop();
    return "png";
}

async function findImageInCache(uri) {
    try {
        let info = await FileSystem.getInfoAsync(uri);
        return { ...info, err: false };
    } catch (error) {
        return {
            exists: false,
            err: true,
            msg: error,
        };
    }
}

async function cacheImage(uri, cacheUri, callback) {
    try {
        const downloadImage = FileSystem.createDownloadResumable(
            uri,
            cacheUri,
            {},
            callback
        );
        const downloaded = await downloadImage.downloadAsync();
        return {
            cached: true,
            err: false,
            path: downloaded.uri,
        };
    } catch (error) {
        return {
            cached: false,
            err: true,
            msg: error,
        };
    }
}
const CustomFastImage = (props) => {
    const {
        source: { uri },
        cacheKey,
        style,
    } = props;
    const isMounted = useRef(true);
    const [imgUri, setUri] = useState("");

    useEffect(() => {
        async function loadImg() {
            let imgXt = getImgXtension();
            if (!imgXt || !imgXt.length) {
                console.log("Couldn't load Image from Xtension!");
                return;
            }
            const cacheFileUri = `${FileSystem.cacheDirectory}${cacheKey}.${imgXt}`;
            let imgXistsInCache = await findImageInCache(cacheFileUri);
            if (imgXistsInCache.exists) {
                //console.log("cached!");
                setUri(cacheFileUri);
            } else {
                setUri(uri);
                let cached = await cacheImage(uri, cacheFileUri, () => {});
                if (cached.cached) {
                    console.log("cached New!");
                    setUri(cached.path);
                } else {
                    setUri(uri);
                    console.log("Couldn't load Image from cache!");
                }
            }
        }
        loadImg().then();
        return () => (isMounted.current = false);
    }, []);
    return (
        <>
            {imgUri ? (
                <Image source={{ uri: imgUri }} style={style} />
            ) : (
                <View
                    style={{ ...style, alignItems: "center", justifyContent: "center" }}
                >
                    <ActivityIndicator size={"small"} />
                </View>
            )}
        </>
    );
};
export default CustomFastImage;