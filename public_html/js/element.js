function element(_name, _tooltipText, _photo, _price) {
    this.name = _name;
    this.tooltipText = _tooltipText;
    this.photo = _photo;
    this.price = _price;
    this.id = wylosujLiczbę(0, 100000000);
    this.maxWidth = 400;
    this.maxHeight = 150;
    this.minHeight = 50;
    this.aspectRatio = 16 / 9;
    this.rotate = 0;
}