// 뒤로가기 버튼 제어
useFocusEffect(
    useCallback(() => {
        console.log('usecallback')
        const onBackPress = () => {
            console.log('back pressed')
            if (showAdd) {
                setShowAdd(false)
                return true;
            } else if (showEdit) {
                setShowEdit(false)
                return true;
            } else {
                return false;
            }
        };

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => subscription.remove();
    }, [showAdd, showEdit])
);