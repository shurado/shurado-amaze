import React from 'react';


export default function withFile(options) {
  return (WrappedComponent) => class extends React.component {
    constructor() {
      
      this.state = {
        file: null,
        name: '',
        type: '',
        size: '',
      };

      this.handleFileUpload.bind(this);
    }

    handleFileUpload(e) {
      const file = e.target.files[0];
      const formData = new FormData();


      if (file) {
        formData.append(options.field || 'file', file);
        this.setState({
          file: formData,
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
    }

    render() {
      return (
        <div>
          <WrappedComponent
            {...this.state}
            {...this.props}
          />
          <input 
            onChange={this.handleFileUpload}
            type="file" hidden={options.hidden || true} />
        </div>
      );
    }
  }
}
